import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Users,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointer,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { contactStore, subscriberStore, reviewStore, analyticsStore } from "@/lib/adminStore";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    contacts: { total: 0, new: 0 },
    subscribers: { total: 0, active: 0, thisMonth: 0 },
    reviews: { total: 0, pending: 0, averageRating: "0" },
    analytics: {
      pageViews: 0,
      uniqueVisitors: 0,
      affiliateClicks: 0,
      bounceRate: "0%",
      avgSessionDuration: "0s",
    },
  });

  useEffect(() => {
    // Load stats
    const contactStats = contactStore.getStats();
    const subscriberStats = subscriberStore.getStats();
    const reviewStats = reviewStore.getStats();
    const analyticsData = analyticsStore.getOverview();

    setStats({
      contacts: contactStats,
      subscribers: subscriberStats,
      reviews: reviewStats,
      analytics: analyticsData,
    });
  }, []);

  const overviewCards = [
    {
      title: "New Messages",
      value: stats.contacts.new,
      total: stats.contacts.total,
      icon: Mail,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      link: "/admin/messages",
      trend: stats.contacts.new > 0 ? "up" : "neutral",
    },
    {
      title: "Subscribers",
      value: stats.subscribers.active,
      subtitle: `+${stats.subscribers.thisMonth} this month`,
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      link: "/admin/subscribers",
      trend: "up",
    },
    {
      title: "Pending Reviews",
      value: stats.reviews.pending,
      total: stats.reviews.total,
      icon: MessageSquare,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      link: "/admin/reviews",
      trend: stats.reviews.pending > 0 ? "attention" : "neutral",
    },
    {
      title: "Affiliate Clicks",
      value: stats.analytics.affiliateClicks,
      subtitle: "Today",
      icon: MousePointer,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      link: "/admin/analytics",
      trend: "up",
    },
  ];

  const analyticsCards = [
    {
      title: "Page Views",
      value: stats.analytics.pageViews.toLocaleString(),
      icon: Eye,
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Unique Visitors",
      value: stats.analytics.uniqueVisitors.toLocaleString(),
      icon: Users,
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Bounce Rate",
      value: stats.analytics.bounceRate,
      icon: TrendingUp,
      change: "-2.1%",
      trend: "down",
    },
    {
      title: "Avg. Session",
      value: stats.analytics.avgSessionDuration,
      icon: Clock,
      change: "+15s",
      trend: "up",
    },
  ];

  // Get recent items
  const recentMessages = contactStore.getAll().slice(0, 5);
  const recentSubscribers = subscriberStore.getAll().slice(0, 5);
  const pendingReviews = reviewStore.getAll().filter((r) => r.status === "pending").slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewCards.map((card, i) => (
          <Link key={i} to={card.link}>
            <Card className="bg-gradient-card border-border hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                    <card.icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  {card.trend === "up" && <ArrowUpRight className="w-5 h-5 text-green-500" />}
                  {card.trend === "attention" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-orange-500/10 text-orange-500">
                      Action Needed
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-foreground">{card.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {card.subtitle || (card.total ? `of ${card.total} total` : card.title)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Analytics Overview */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Analytics Overview</CardTitle>
            <Link to="/admin/analytics">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {analyticsCards.map((card, i) => (
              <div key={i} className="text-center">
                <card.icon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold text-foreground">{card.value}</p>
                <p className="text-sm text-muted-foreground">{card.title}</p>
                <div
                  className={`flex items-center justify-center gap-1 text-xs mt-1 ${
                    card.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {card.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {card.change}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Messages */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Messages</CardTitle>
              <Link to="/admin/messages" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentMessages.length > 0 ? (
              <div className="space-y-4">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        msg.status === "new" ? "bg-blue-500" : "bg-muted"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{msg.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{msg.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No messages yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Subscribers */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">New Subscribers</CardTitle>
              <Link to="/admin/subscribers" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentSubscribers.length > 0 ? (
              <div className="space-y-4">
                {recentSubscribers.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{sub.email}</p>
                      <p className="text-xs text-muted-foreground">{sub.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No subscribers yet</p>
            )}
          </CardContent>
        </Card>

        {/* Pending Reviews */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Pending Reviews</CardTitle>
              <Link to="/admin/reviews" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {pendingReviews.length > 0 ? (
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <div key={review.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">
                        {review.brokerName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        by {review.authorName} - {review.rating}/5
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">No pending reviews</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link to="/admin/subscribers">Export Subscribers</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/reviews">Moderate Reviews</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">
                Open GA4
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                Open Search Console
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
