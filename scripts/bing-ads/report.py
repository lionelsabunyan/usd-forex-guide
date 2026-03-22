#!/usr/bin/env python3
"""
Bing Ads Gunluk Performans Raporu
Kampanya performans verilerini ceker, analiz eder ve Telegram'a gonderir.

Kullanim:
  python3 report.py           # Sadece konsola yazdir
  python3 report.py --send    # Telegram'a da gonder
  python3 report.py --days 7  # Son 7 gunluk veri (varsayilan: 1)
"""

import csv
import io
import os
import sys
import time
import zipfile
from datetime import datetime, timedelta

# Load .env
env_path = "/home/paperclip/.env"
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key, value)

from bingads.service_client import ServiceClient
from bingads.authorization import AuthorizationData, OAuthDesktopMobileAuthCodeGrant

DEVELOPER_TOKEN = os.getenv("BING_ADS_DEVELOPER_TOKEN")
CLIENT_ID = os.getenv("BING_ADS_CLIENT_ID")
CLIENT_SECRET = os.getenv("BING_ADS_CLIENT_SECRET")
ACCOUNT_ID = os.getenv("BING_ADS_ACCOUNT_ID")
CUSTOMER_ID = os.getenv("BING_ADS_CUSTOMER_ID")
REFRESH_TOKEN = os.getenv("BING_ADS_REFRESH_TOKEN")


def get_auth():
    """Microsoft OAuth yetkilendirmesi"""
    authentication = OAuthDesktopMobileAuthCodeGrant(
        client_id=CLIENT_ID,
        env="production",
    )
    authentication.request_oauth_tokens_by_refresh_token(REFRESH_TOKEN)

    authorization_data = AuthorizationData(
        account_id=ACCOUNT_ID,
        customer_id=CUSTOMER_ID,
        developer_token=DEVELOPER_TOKEN,
        authentication=authentication,
    )
    return authorization_data


def get_account_info(auth_data):
    """Hesap bilgilerini cek"""
    customer_service = ServiceClient(
        service="CustomerManagementService",
        version=13,
        authorization_data=auth_data,
    )

    try:
        account = customer_service.GetAccount(AccountId=auth_data.account_id)
        return {
            "name": account.Name,
            "id": account.Id,
            "status": account.AccountLifeCycleStatus,
            "currency": account.CurrencyCode,
            "timezone": account.TimeZone,
        }
    except Exception as e:
        print(f"Account info error: {e}")
        return None


def get_campaigns(auth_data):
    """Kampanya listesini cek"""
    campaign_service = ServiceClient(
        service="CampaignManagementService",
        version=13,
        authorization_data=auth_data,
    )

    try:
        response = campaign_service.GetCampaignsByAccountId(
            AccountId=auth_data.account_id,
            CampaignType="Search Shopping",
        )
        campaigns = []
        if response and hasattr(response, "Campaign"):
            for camp in response.Campaign:
                campaigns.append({
                    "id": camp.Id,
                    "name": camp.Name,
                    "status": camp.Status,
                    "budget": getattr(camp.DailyBudget, "Amount", None) if hasattr(camp, "DailyBudget") else None,
                    "type": camp.CampaignType,
                })
        return campaigns
    except Exception as e:
        print(f"Campaigns error: {e}")
        return []


def get_campaign_performance(auth_data, days=1):
    """Kampanya performans verilerini Reporting API ile cek"""
    reporting_service = ServiceClient(
        service="ReportingService",
        version=13,
        authorization_data=auth_data,
    )

    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)

    # Build report request
    report_request = reporting_service.factory.create("CampaignPerformanceReportRequest")
    report_request.Format = "Csv"
    report_request.ReportName = "DailyPerformance"
    report_request.ReturnOnlyCompleteData = False
    report_request.Aggregation = "Summary"

    # Time — use CustomDateRange
    report_time = reporting_service.factory.create("ReportTime")
    report_time.PredefinedTime = None
    custom_start = reporting_service.factory.create("Date")
    custom_start.Day = start_date.day
    custom_start.Month = start_date.month
    custom_start.Year = start_date.year
    custom_end = reporting_service.factory.create("Date")
    custom_end.Day = end_date.day
    custom_end.Month = end_date.month
    custom_end.Year = end_date.year
    report_time.CustomDateRangeStart = custom_start
    report_time.CustomDateRangeEnd = custom_end
    report_time.ReportTimeZone = None
    report_request.Time = report_time

    # Columns
    columns = reporting_service.factory.create("ArrayOfCampaignPerformanceReportColumn")
    columns.CampaignPerformanceReportColumn = [
        "CampaignName",
        "CampaignStatus",
        "Impressions",
        "Clicks",
        "Ctr",
        "Spend",
        "AverageCpc",
        "Conversions",
        "Revenue",
        "CostPerConversion",
    ]
    report_request.Columns = columns

    # Scope - account level
    scope = reporting_service.factory.create("AccountThroughCampaignReportScope")
    account_ids = reporting_service.factory.create("ns1:ArrayOflong")
    account_ids.long = [int(ACCOUNT_ID)]
    scope.AccountIds = account_ids
    scope.Campaigns = None
    report_request.Scope = scope

    # Submit report
    try:
        report_request_id = reporting_service.SubmitGenerateReport(ReportRequest=report_request)
        print(f"Rapor istegi gonderildi (ID: {report_request_id})")
    except Exception as e:
        print(f"Rapor istegi hatasi: {e}")
        return []

    # Poll for completion
    max_wait = 120
    waited = 0
    report_status = None
    while waited < max_wait:
        try:
            report_status = reporting_service.PollGenerateReport(ReportRequestId=report_request_id)
            status = report_status.Status
            print(f"  Rapor durumu: {status}")
            if status == "Success":
                break
            elif status == "Error":
                print("  Rapor olusturulamadi!")
                return []
        except Exception as e:
            print(f"  Poll hatasi: {e}")
        time.sleep(5)
        waited += 5

    if not report_status or report_status.Status != "Success":
        print("Rapor zaman asimina ugradi")
        return []

    # Download report
    download_url = report_status.ReportDownloadUrl
    if not download_url:
        print("Rapor bos (veri yok)")
        return []

    import requests
    print(f"Rapor indiriliyor...")
    resp = requests.get(download_url, timeout=60)
    if resp.status_code != 200:
        print(f"Indirme hatasi: HTTP {resp.status_code}")
        return []

    # Parse CSV from zip
    results = []
    try:
        z = zipfile.ZipFile(io.BytesIO(resp.content))
        csv_name = z.namelist()[0]
        csv_data = z.read(csv_name).decode("utf-8-sig")

        # Skip header lines (Bing reports have metadata rows before actual CSV)
        lines = csv_data.strip().split("\n")
        csv_start = 0
        for i, line in enumerate(lines):
            if line.startswith('"CampaignName"') or line.startswith("CampaignName"):
                csv_start = i
                break

        if csv_start == 0:
            # Try to find header row
            for i, line in enumerate(lines):
                if "Impressions" in line:
                    csv_start = i
                    break

        csv_content = "\n".join(lines[csv_start:])
        reader = csv.DictReader(io.StringIO(csv_content))

        def safe_float(val, default=0.0):
            try:
                return float(val) if val else default
            except (ValueError, TypeError):
                return default

        def safe_int(val, default=0):
            try:
                return int(float(val)) if val else default
            except (ValueError, TypeError):
                return default

        for row in reader:
            # Skip summary/footer rows
            campaign_name = row.get("CampaignName", "").strip()
            if not campaign_name or campaign_name.startswith("©") or campaign_name == "":
                continue
            results.append({
                "name": campaign_name,
                "status": row.get("CampaignStatus", ""),
                "impressions": safe_int(row.get("Impressions")),
                "clicks": safe_int(row.get("Clicks")),
                "ctr": row.get("Ctr", "0.00%").strip() or "0.00%",
                "spend": safe_float(row.get("Spend")),
                "avg_cpc": safe_float(row.get("AverageCpc")),
                "conversions": safe_float(row.get("Conversions")),
                "revenue": safe_float(row.get("Revenue")),
                "cost_per_conversion": safe_float(row.get("CostPerConversion")),
            })
    except Exception as e:
        print(f"CSV parse hatasi: {e}")
        import traceback
        traceback.print_exc()

    return results


def analyze_performance(perf_data, campaigns):
    """Performans analizi ve bid onerileri"""
    analysis = {
        "total_spend": 0,
        "total_clicks": 0,
        "total_impressions": 0,
        "total_conversions": 0,
        "total_revenue": 0,
        "low_performers": [],
        "recommendations": [],
    }

    if not perf_data:
        return analysis

    for p in perf_data:
        analysis["total_spend"] += p["spend"]
        analysis["total_clicks"] += p["clicks"]
        analysis["total_impressions"] += p["impressions"]
        analysis["total_conversions"] += p["conversions"]
        analysis["total_revenue"] += p["revenue"]

        # CTR parse
        ctr_str = p["ctr"].replace("%", "").strip()
        try:
            ctr_val = float(ctr_str)
        except ValueError:
            ctr_val = 0

        # Low CTR alert (below 1%)
        if p["impressions"] > 50 and ctr_val < 1.0:
            analysis["low_performers"].append(
                f"  {p['name']}: CTR {p['ctr']} (dusuk)"
            )

        # High CPC with no conversions
        if p["spend"] > 5 and p["conversions"] == 0:
            analysis["low_performers"].append(
                f"  {p['name']}: {p['spend']:.2f} harcama, 0 donusum"
            )

        # Bid optimization suggestions
        if ctr_val > 3.0 and p["conversions"] > 0:
            analysis["recommendations"].append(
                f"  {p['name']}: Yuksek CTR ({p['ctr']}) — bid artirmayi degerlendir"
            )
        elif p["impressions"] > 100 and ctr_val < 0.5:
            analysis["recommendations"].append(
                f"  {p['name']}: Cok dusuk CTR — keyword/ad copy revize et"
            )
        elif p["avg_cpc"] > 0 and p["conversions"] > 0:
            roas = p["revenue"] / p["spend"] if p["spend"] > 0 else 0
            if roas < 1.0:
                analysis["recommendations"].append(
                    f"  {p['name']}: ROAS {roas:.1f}x — bid azalt veya hedefleme daralt"
                )

    return analysis


def build_telegram_message(account, campaigns, perf_data, analysis, days):
    """Telegram mesaji olustur"""
    bugun = datetime.now().strftime("%d.%m.%Y")
    period = "bugun" if days == 1 else f"son {days} gun"

    lines = [f"*Bing Ads Raporu* — {bugun}", f"Donem: {period}", ""]

    if account:
        lines.append(f"*Hesap:* {account['name']} | {account['currency']}")
        lines.append("")

    # Toplam metrikler
    if perf_data:
        lines.append("*Toplam Performans:*")
        lines.append(f"  Gosterim: {analysis['total_impressions']:,}")
        lines.append(f"  Tiklama: {analysis['total_clicks']:,}")
        overall_ctr = (analysis['total_clicks'] / analysis['total_impressions'] * 100) if analysis['total_impressions'] > 0 else 0
        lines.append(f"  CTR: {overall_ctr:.2f}%")
        lines.append(f"  Harcama: {analysis['total_spend']:.2f}")
        lines.append(f"  Donusum: {analysis['total_conversions']:.0f}")
        lines.append(f"  Gelir: {analysis['total_revenue']:.2f}")
        lines.append("")

        # Kampanya detaylari
        lines.append("*Kampanya Bazli:*")
        for p in sorted(perf_data, key=lambda x: x["spend"], reverse=True):
            status_icon = "" if p["status"] == "Active" else " [Pasif]"
            lines.append(f"  *{p['name']}*{status_icon}")
            lines.append(f"    {p['impressions']:,} gosterim | {p['clicks']} tik | CTR: {p['ctr']}")
            lines.append(f"    Harcama: {p['spend']:.2f} | CPC: {p['avg_cpc']:.2f}")
            if p["conversions"] > 0:
                lines.append(f"    Donusum: {p['conversions']:.0f} | Gelir: {p['revenue']:.2f}")
            lines.append("")
    else:
        lines.append("_Bu donemde performans verisi yok_")
        lines.append("")

        # Kampanya listesi (performans verisi yoksa en azindan liste goster)
        if campaigns:
            lines.append(f"*Kampanyalar* ({len(campaigns)}):")
            for c in campaigns:
                status_icon = "" if c["status"] == "Active" else " [Pasif]"
                budget_str = f" | Budget: {c['budget']}" if c.get("budget") else ""
                lines.append(f"  {c['name']}{status_icon}{budget_str}")
            lines.append("")

    # Uyarilar
    if analysis["low_performers"]:
        lines.append("*Uyarilar:*")
        lines.extend(analysis["low_performers"])
        lines.append("")

    # Oneriler
    if analysis["recommendations"]:
        lines.append("*Bid Onerileri:*")
        lines.extend(analysis["recommendations"])
        lines.append("")

    lines.append("_Bing Ads — beginnerfxguide.com_")
    return "\n".join(lines)


def send_telegram(message: str) -> bool:
    """Telegram'a mesaj gonder"""
    import requests

    token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    if not token or not chat_id:
        print("Telegram credentials missing")
        return False
    try:
        resp = requests.post(
            f"https://api.telegram.org/bot{token}/sendMessage",
            json={"chat_id": chat_id, "text": message, "parse_mode": "Markdown"},
            timeout=15,
        )
        return resp.json().get("ok", False)
    except Exception as e:
        print(f"Telegram error: {e}")
        return False


def main():
    # Parse args
    days = 1
    if "--days" in sys.argv:
        idx = sys.argv.index("--days")
        if idx + 1 < len(sys.argv):
            days = int(sys.argv[idx + 1])

    print(f"Bing Ads Gunluk Performans Raporu (son {days} gun)")
    print("=" * 50)

    # Credential check
    missing = []
    for var in ["BING_ADS_DEVELOPER_TOKEN", "BING_ADS_CLIENT_ID", "BING_ADS_CLIENT_SECRET",
                "BING_ADS_ACCOUNT_ID", "BING_ADS_CUSTOMER_ID", "BING_ADS_REFRESH_TOKEN"]:
        if not os.getenv(var):
            missing.append(var)
    if missing:
        print(f"HATA: Eksik env vars: {', '.join(missing)}")
        sys.exit(1)

    print("Credentials OK. OAuth baglantisi kuruluyor...")

    try:
        auth_data = get_auth()
        print("OAuth basarili!")

        # Account info
        account = get_account_info(auth_data)
        if account:
            print(f"Hesap: {account['name']} ({account['id']}) - {account['status']}")

        # Campaigns
        campaigns = get_campaigns(auth_data)
        print(f"Kampanya sayisi: {len(campaigns)}")

        # Performance data
        print("\nPerformans verileri cekiliyor...")
        perf_data = get_campaign_performance(auth_data, days=days)
        print(f"Performans verisi: {len(perf_data)} kampanya")

        # Analysis
        analysis = analyze_performance(perf_data, campaigns)

        # Build message
        message = build_telegram_message(account, campaigns, perf_data, analysis, days)

        print("\n--- Rapor ---")
        print(message)

        # Summary
        if perf_data:
            print(f"\n--- Ozet ---")
            print(f"Toplam Harcama: {analysis['total_spend']:.2f}")
            print(f"Toplam Tiklama: {analysis['total_clicks']}")
            print(f"Toplam Donusum: {analysis['total_conversions']:.0f}")
            if analysis["low_performers"]:
                print(f"Uyari sayisi: {len(analysis['low_performers'])}")
            if analysis["recommendations"]:
                print(f"Oneri sayisi: {len(analysis['recommendations'])}")

        if "--send" in sys.argv:
            success = send_telegram(message)
            print(f"\nTelegram: {'Gonderildi!' if success else 'BASARISIZ!'}")

    except Exception as e:
        print(f"HATA: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
