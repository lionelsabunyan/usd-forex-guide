import { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Mail,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDripCampaignStats, type DripCampaignStats } from "@/lib/dripCampaignService";
import { DRIP_TOTAL_DAYS } from "@/lib/dripCampaign";
import {
  getLatestAnalytics,
  getAnalyticsRange,
  getTopPages,
  getTrafficSources,
  getAffiliateClicks,
  type DailyAnalytics,
  type TopPage,
  type TrafficSource,
  type AffiliateClick,
} from "@/lib/analyticsService";

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function calcChange(current: number, previous: number): string {
  if (!previous) return "—";
  const pct = ((current - previous) / previous) * 100;
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
}

const AdminAnalytics = () => {
  const [dripStats, setDripStats] = useState<DripCampaignStats | null>(null);
  const [latest, setLatest] = useState<DailyAnalytics | null>(null);
  const [previous, setPrevious] = useState<DailyAnalytics | null>(null);
  const [topPagesData, setTopPagesData] = useState<TopPage[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficSource[]>([]);
  const [affiliateData, setAffiliateData] = useState<AffiliateClick[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<"live" | "mock">("mock");

  useEffect(() => {
    getDripCampaignStats().then(setDripStats);
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    setLoading(true);
    try {
      const range = await getAnalyticsRange(14);
      if (range.length > 0) {
        setLatest(range[0]);
        if (range.length > 1) setPrevious(range[1]);
        setDataSource("live");

        const [pages, sources, clicks] = await Promise.all([
          getTopPages(range[0].date),
          getTrafficSources(range[0].date),
          getAffiliateClicks(30),
        ]);
        setTopPagesData(pages);
        setTrafficData(sources);
        setAffiliateData(clicks);
      }
    } catch (e) {
      // Analytics fetch failed, using mock data
    }
    setLoading(false);
  }

  // Build overview stats from live or mock data
  const totalAffClicks = affiliateData.reduce((sum, a) => sum + a.clicks, 0);

  const overviewStats = latest
    ? [
        {
          title: "Page Views",
          value: latest.pageviews.toLocaleString(),
          change: previous ? calcChange(latest.pageviews, previous.pageviews) : "—",
          icon: Eye,
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
        },
        {
          title: "Unique Visitors",
          value: latest.users.toLocaleString(),
          change: previous ? calcChange(latest.users, previous.users) : "—",
          icon: Users,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
        },
        {
          title: "Affiliate Clicks",
          value: totalAffClicks.toLocaleString(),
          change: "—",
          icon: MousePointer,
          color: "text-purple-500",
          bgColor: "bg-purple-500/10",
        },
        {
          title: "Avg. Session",
          value: formatDuration(latest.avg_session_duration),
          change: previous ? calcChange(latest.avg_session_duration, previous.avg_session_duration) : "—",
          icon: Clock,
          color: "text-orange-500",
          bgColor: "bg-orange-500/10",
        },
      ]
    : [
        { title: "Page Views", value: "—", change: "—", icon: Eye, color: "text-blue-500", bgColor: "bg-blue-500/10" },
        { title: "Unique Visitors", value: "—", change: "—", icon: Users, color: "text-green-500", bgColor: "bg-green-500/10" },
        { title: "Affiliate Clicks", value: "—", change: "—", icon: MousePointer, color: "text-purple-500", bgColor: "bg-purple-500/10" },
        { title: "Avg. Session", value: "—", change: "—", icon: Clock, color: "text-orange-500", bgColor: "bg-orange-500/10" },
      ];

  const topPages = topPagesData.length > 0
    ? topPagesData.map((p) => ({ path: p.page_path, views: p.pageviews }))
    : [
        { path: "/", views: 0 },
        { path: "/brokers", views: 0 },
      ];

  const affiliatePerformance = affiliateData.length > 0
    ? affiliateData.map((a) => ({ broker: a.broker, clicks: a.clicks }))
    : [];

  const totalSessions = trafficData.reduce((sum, s) => sum + s.sessions, 0);
  const trafficSources = trafficData.length > 0
    ? trafficData.map((s) => ({
        source: `${s.source} / ${s.medium}`,
        sessions: s.sessions,
        percentage: totalSessions > 0 ? Math.round((s.sessions / totalSessions) * 100) : 0,
      }))
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            {loading ? "Loading..." : dataSource === "live"
              ? `Live data — ${latest?.date || ""}`
              : "No data yet — run ga4_analytics.py collect"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={loadAnalytics} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" asChild>
            <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">
              <BarChart3 className="w-4 h-4 mr-2" />
              Open GA4
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
              <TrendingUp className="w-4 h-4 mr-2" />
              Search Console
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {overviewStats.map((stat, i) => (
          <Card key={i} className="bg-gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.change.startsWith("-") ? "text-red-500" : "text-green-500"}`}>
                  {stat.change.startsWith("-")
                    ? <ArrowDownRight className="w-4 h-4" />
                    : <ArrowUpRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground truncate max-w-[200px]">{page.path}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{page.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">{source.source}</span>
                    <span className="text-sm text-muted-foreground">
                      {source.sessions.toLocaleString()} ({source.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Affiliate Performance */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Affiliate Clicks</CardTitle>
            <span className="text-sm text-muted-foreground">Last 30 days</span>
          </div>
        </CardHeader>
        <CardContent>
          {affiliatePerformance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Broker</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliatePerformance.map((broker, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-4 py-3">
                        <span className="font-medium text-foreground">{broker.broker}</span>
                      </td>
                      <td className="px-4 py-3 text-right text-foreground">{broker.clicks}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-secondary/50">
                    <td className="px-4 py-3 font-medium text-foreground">Total</td>
                    <td className="px-4 py-3 text-right font-bold text-foreground">
                      {totalAffClicks.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No affiliate click data available</p>
          )}
        </CardContent>
      </Card>

      {/* Drip Campaign Stats */}
      {dripStats && dripStats.total_enrolled > 0 && (
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                7-Day Drip Campaign
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                {dripStats.total_enrolled} enrolled
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 rounded-lg bg-green-500/10">
                <p className="text-2xl font-bold text-green-500">{dripStats.active}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-blue-500/10">
                <p className="text-2xl font-bold text-blue-500">{dripStats.completed}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-red-500/10">
                <p className="text-2xl font-bold text-red-500">{dripStats.unsubscribed}</p>
                <p className="text-xs text-muted-foreground">Unsubscribed</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Active Subscribers by Day</p>
              <div className="flex gap-2">
                {Array.from({ length: DRIP_TOTAL_DAYS }, (_, i) => i + 1).map(day => (
                  <div key={day} className="flex-1 text-center">
                    <div
                      className="bg-primary/20 rounded-t-sm mx-auto"
                      style={{
                        width: '100%',
                        height: `${Math.max(4, ((dripStats.by_day[day] || 0) / Math.max(dripStats.active, 1)) * 60)}px`,
                      }}
                    />
                    <p className="text-xs font-medium mt-1">{dripStats.by_day[day] || 0}</p>
                    <p className="text-[10px] text-muted-foreground">Day {day}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>External Analytics Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-center"
            >
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-medium text-foreground">Google Analytics</p>
            </a>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-center"
            >
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm font-medium text-foreground">Search Console</p>
            </a>
            <a
              href="https://ads.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-center"
            >
              <MousePointer className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <p className="text-sm font-medium text-foreground">Bing Ads</p>
            </a>
            <a
              href="https://www.semrush.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-center"
            >
              <Eye className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <p className="text-sm font-medium text-foreground">SEMrush</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
