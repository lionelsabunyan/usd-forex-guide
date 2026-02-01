import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Download,
  Trash2,
  UserX,
  Filter,
  ChevronDown,
  Mail,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { subscriberStore, NewsletterSubscriber } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const AdminSubscribers = () => {
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = () => {
    setSubscribers(subscriberStore.getAll());
  };

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch = sub.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUnsubscribe = (email: string) => {
    subscriberStore.unsubscribe(email);
    loadSubscribers();
    toast({
      title: "Subscriber Updated",
      description: "Email has been marked as unsubscribed",
    });
  };

  const handleDelete = (id: string) => {
    subscriberStore.delete(id);
    loadSubscribers();
    toast({
      title: "Subscriber Deleted",
      description: "The subscriber has been removed",
    });
  };

  const handleExport = () => {
    const csv = subscriberStore.exportCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast({
      title: "Export Complete",
      description: "Subscribers list has been downloaded",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stats = subscriberStore.getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Subscribers</h1>
          <p className="text-muted-foreground">Manage newsletter subscribers</p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Mail className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-foreground">{stats.active}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <UserX className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold text-foreground">{stats.unsubscribed}</p>
            <p className="text-sm text-muted-foreground">Unsubscribed</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold text-foreground">{stats.thisMonth}</p>
            <p className="text-sm text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  {statusFilter === "all" ? "All Status" : statusFilter}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("unsubscribed")}>
                  Unsubscribed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Subscribers Table */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Subscribers ({filteredSubscribers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredSubscribers.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscribed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.email}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs rounded-full bg-secondary">
                          {sub.source}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            sub.status === "active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {sub.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(sub.subscribedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {sub.status === "active" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleUnsubscribe(sub.email)}
                              title="Unsubscribe"
                            >
                              <UserX className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(sub.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No subscribers found</p>
              <p className="text-sm mt-2">
                Subscribers will appear here when users sign up for the newsletter
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSubscribers;
