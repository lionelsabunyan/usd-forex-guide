import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Clock,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminAnalytics = () => {
  // Simulated analytics data - In production, fetch from GA4 API
  const overviewStats = [
    {
      title: "Page Views",
      value: "12,543",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Unique Visitors",
      value: "4,821",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Affiliate Clicks",
      value: "342",
      change: "+23.1%",
      trend: "up",
      icon: MousePointer,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Avg. Session",
      value: "3m 24s",
      change: "+15s",
      trend: "up",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const topPages = [
    { path: "/", views: 3245, change: "+5.2%" },
    { path: "/review/fxglory", views: 1823, change: "+12.3%" },
    { path: "/review/n1cm", views: 1456, change: "+8.7%" },
    { path: "/guides/beginners-guide", views: 987, change: "+15.4%" },
    { path: "/brokers", views: 754, change: "+3.2%" },
    { path: "/guides/risk-management", views: 623, change: "+21.5%" },
    { path: "/faq", views: 512, change: "-2.1%" },
    { path: "/blog", views: 423, change: "+6.8%" },
  ];

  const affiliatePerformance = [
    { broker: "FXGlory", clicks: 187, conversions: 23, revenue: "$1,610", ctr: "4.2%" },
    { broker: "N1CM", clicks: 98, conversions: 8, revenue: "$560", ctr: "3.1%" },
    { broker: "eToro", clicks: 45, conversions: 2, revenue: "$140", ctr: "1.8%" },
    { broker: "OANDA", clicks: 12, conversions: 0, revenue: "$0", ctr: "0.9%" },
  ];

  const trafficSources = [
    { source: "Organic Search", sessions: 2845, percentage: 59 },
    { source: "Direct", sessions: 1023, percentage: 21 },
    { source: "Bing Ads", sessions: 512, percentage: 11 },
    { source: "Social Media", sessions: 287, percentage: 6 },
    { source: "Referral", sessions: 154, percentage: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your site's performance</p>
        </div>
        <div className="flex gap-2">
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
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <ArrowUpRight className="w-4 h-4" />
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
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">{page.views.toLocaleString()}</span>
                    <span className={`text-xs ${page.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                      {page.change}
                    </span>
                  </div>
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
            <CardTitle>Affiliate Performance</CardTitle>
            <span className="text-sm text-muted-foreground">Last 30 days</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Broker</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Clicks</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Conversions</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">CTR</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {affiliatePerformance.map((broker, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <span className="font-medium text-foreground">{broker.broker}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-foreground">{broker.clicks}</td>
                    <td className="px-4 py-3 text-right text-foreground">{broker.conversions}</td>
                    <td className="px-4 py-3 text-right text-muted-foreground">{broker.ctr}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-medium text-green-500">{broker.revenue}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-secondary/50">
                  <td className="px-4 py-3 font-medium text-foreground">Total</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">342</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">33</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">3.2%</td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-bold text-green-500">$2,310</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

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
