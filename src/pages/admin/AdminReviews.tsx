import { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  ChevronDown,
  Check,
  X,
  Star,
  Eye,
  Trash2,
  Shield,
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
import { reviewStore, BrokerReview } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const AdminReviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<BrokerReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<BrokerReview | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    setReviews(reviewStore.getAll());
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.brokerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, status: BrokerReview["status"]) => {
    reviewStore.updateStatus(id, status);
    loadReviews();
    if (selectedReview?.id === id) {
      setSelectedReview({ ...selectedReview, status });
    }
    toast({
      title: "Review Updated",
      description: `Review has been ${status}`,
    });
  };

  const handleVerify = (id: string) => {
    reviewStore.verify(id);
    loadReviews();
    if (selectedReview?.id === id) {
      setSelectedReview({ ...selectedReview, isVerified: true });
    }
    toast({
      title: "Review Verified",
      description: "The review has been marked as verified",
    });
  };

  const handleDelete = (id: string) => {
    reviewStore.delete(id);
    loadReviews();
    if (selectedReview?.id === id) {
      setSelectedReview(null);
    }
    toast({
      title: "Review Deleted",
      description: "The review has been permanently deleted",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stats = reviewStore.getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Reviews</h1>
          <p className="text-muted-foreground">Moderate broker reviews from users</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-sm rounded-full bg-orange-500/10 text-orange-500">
            {stats.pending} Pending
          </span>
          <span className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-500">
            {stats.approved} Approved
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold text-foreground">{stats.averageRating}</p>
            <p className="text-sm text-muted-foreground">Avg. Rating</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <Check className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-foreground">{stats.approved}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border">
          <CardContent className="p-4 text-center">
            <X className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold text-foreground">{stats.rejected}</p>
            <p className="text-sm text-muted-foreground">Rejected</p>
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
                placeholder="Search reviews..."
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
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("approved")}>Approved</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>Rejected</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Reviews List */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Reviews ({filteredReviews.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    onClick={() => setSelectedReview(review)}
                    className={`p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${
                      selectedReview?.id === review.id ? "bg-secondary" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{review.brokerName}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating ? "fill-primary text-primary" : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          {review.isVerified && (
                            <Shield className="w-3 h-3 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-foreground truncate">{review.title}</p>
                        <p className="text-xs text-muted-foreground">
                          by {review.authorName} - {formatDate(review.createdAt)}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full shrink-0 ${
                          review.status === "pending"
                            ? "bg-orange-500/10 text-orange-500"
                            : review.status === "approved"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {review.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No reviews found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Review Detail */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Review Detail</CardTitle>
              {selectedReview && (
                <Button variant="ghost" size="icon" onClick={() => setSelectedReview(null)}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedReview ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-foreground">{selectedReview.title}</h3>
                    <div className="flex items-center gap-2">
                      {selectedReview.isVerified && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">
                          Verified
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          selectedReview.status === "pending"
                            ? "bg-orange-500/10 text-orange-500"
                            : selectedReview.status === "approved"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {selectedReview.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{selectedReview.brokerName}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < selectedReview.rating ? "fill-primary text-primary" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({selectedReview.rating}/5)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    by {selectedReview.authorName} ({selectedReview.authorEmail}) -{" "}
                    {formatDate(selectedReview.createdAt)}
                  </p>
                </div>

                {/* Review Content */}
                <div className="p-4 bg-secondary rounded-lg space-y-4">
                  <p className="text-foreground">{selectedReview.review}</p>
                  {selectedReview.pros && (
                    <div>
                      <p className="text-sm font-medium text-green-500 mb-1">Pros:</p>
                      <p className="text-sm text-muted-foreground">{selectedReview.pros}</p>
                    </div>
                  )}
                  {selectedReview.cons && (
                    <div>
                      <p className="text-sm font-medium text-red-500 mb-1">Cons:</p>
                      <p className="text-sm text-muted-foreground">{selectedReview.cons}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {selectedReview.status === "pending" && (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleStatusChange(selectedReview.id, "approved")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleStatusChange(selectedReview.id, "rejected")}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                  {!selectedReview.isVerified && selectedReview.status === "approved" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVerify(selectedReview.id)}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Mark as Verified
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(selectedReview.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2 text-destructive" />
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a review to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReviews;
