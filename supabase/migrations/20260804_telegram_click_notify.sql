-- Telegram bildirimi: affiliate_clicks tablosuna satır düştüğü anda mesaj at.
-- Kaynak GA4 değil çünkü GA4 standart raporu bugünkü veriyi saatlerce gecikmeli veriyor,
-- realtime API ise customEvent:broker_name dimension'ını kabul etmiyor.
--
-- Telegram bot token / chat id bu dosyada YOK; Supabase Vault'ta duruyor:
--   vault.create_secret('<token>', 'telegram_bot_token')
--   vault.create_secret('<chat_id>', 'telegram_chat_id')

create extension if not exists pg_net;

create or replace function public.notify_telegram_affiliate_click()
returns trigger
language plpgsql
security definer
set search_path = public, vault, net
as $$
declare
  -- sadece kozmetik: eşleşme yoksa initcap fallback'i kullanılır
  v_names constant jsonb := '{"unitedpips":"UnitedPips","fxglory":"FXGlory","n1cm":"N1CM",
    "lmfx":"LMFX","midasfx":"MidasFX","plexytrade":"PlexyTrade","coinexx":"Coinexx",
    "hankotrade":"Hankotrade","tastyfx":"tastyfx","forexcom":"Forex.com","hfm":"HFM",
    "etoro":"eToro","fxpro":"FxPro","oanda":"OANDA","ig":"IG Markets","xm":"XM","fbs":"FBS",
    "fxtm":"FXTM","exness":"Exness","pepperstone":"Pepperstone","avatrade":"AvaTrade",
    "interactivebrokers":"Interactive Brokers","charlesschwab":"Charles Schwab"}'::jsonb;
  v_token  text;
  v_chat   text;
  v_broker text;
  v_page   text;
  v_source text;
  v_text   text;
  v_recent int;
begin
  select decrypted_secret into v_token from vault.decrypted_secrets where name = 'telegram_bot_token';
  select decrypted_secret into v_chat  from vault.decrypted_secrets where name = 'telegram_chat_id';
  if v_token is null or v_chat is null then
    return new;
  end if;

  -- Flood freni: tablo anon-insert'e açık (anon key public bundle'da), yani satır sayısı
  -- saldırgan kontrolünde. 5 dakikada 10'dan fazla tıklama varsa bildirim susar, kayıt devam eder.
  select count(*) into v_recent from public.affiliate_clicks
   where created_at > now() - interval '5 minutes';
  if v_recent > 10 then
    -- ponytail: eşiği geçerken tek uyarı; toplu insert eşiği atlarsa uyarı düşmez.
    -- Durum tablosu tutmaya değmez — gerçek tıklamalar tek tek insert olur.
    if v_recent = 11 then
      perform net.http_post(
        url     := 'https://api.telegram.org/bot' || v_token || '/sendMessage',
        body    := jsonb_build_object('chat_id', v_chat,
                     'text', 'Uyari: son 5 dakikada 10+ tiklama. Bildirimler gecici olarak susturuldu.'),
        headers := '{"Content-Type": "application/json"}'::jsonb
      );
    end if;
    return new;
  end if;

  -- Metin de saldırgan kontrolünde: temizle + kırp. parse_mode gönderilmiyor → markdown/link enjeksiyonu yok.
  select left(regexp_replace(coalesce(new.broker_id, '?'),          '[^a-zA-Z0-9 _.-]', '', 'g'), 40),
         left(regexp_replace(coalesce(new.click_location, '?'),     '[^a-zA-Z0-9 _.-]', '', 'g'), 40),
         left(regexp_replace(coalesce(new.source, 'direct'),        '[^a-zA-Z0-9 _.-]', '', 'g'), 40)
    into v_broker, v_page, v_source;

  v_text := format(
    E'\U0001F4B0 Yeni dönüşüm\nBroker: %s\nSayfa: %s\nKaynak: %s%s\nSaat: %s',
    coalesce(v_names->>v_broker, initcap(v_broker)),
    v_page,
    v_source,
    case when new.msclkid is not null then ' (paid)' else '' end,
    to_char(new.created_at at time zone 'Europe/Istanbul', 'HH24:MI')
  );

  perform net.http_post(
    url     := 'https://api.telegram.org/bot' || v_token || '/sendMessage',
    body    := jsonb_build_object('chat_id', v_chat, 'text', v_text),
    headers := '{"Content-Type": "application/json"}'::jsonb
  );

  return new;
exception
  -- bildirim hatası tıklama kaydını asla düşürmemeli
  when others then
    return new;
end;
$$;

drop trigger if exists trg_notify_telegram_affiliate_click on public.affiliate_clicks;
create trigger trg_notify_telegram_affiliate_click
  after insert on public.affiliate_clicks
  for each row execute function public.notify_telegram_affiliate_click();
