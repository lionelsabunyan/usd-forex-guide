import { useState, useEffect } from "react";
import {
  Mail,
  MailOpen,
  Reply,
  Archive,
  Trash2,
  Search,
  Filter,
  ChevronDown,
  Eye,
  X,
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
import { contactStore, ContactMessage } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const AdminMessages = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    setMessages(contactStore.getAll());
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || msg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, status: ContactMessage["status"]) => {
    contactStore.updateStatus(id, status);
    loadMessages();
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, status });
    }
    toast({
      title: "Status Updated",
      description: `Message marked as ${status}`,
    });
  };

  const handleDelete = (id: string) => {
    contactStore.delete(id);
    loadMessages();
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
    toast({
      title: "Message Deleted",
      description: "The message has been permanently deleted",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Mail className="w-4 h-4 text-blue-500" />;
      case "read":
        return <MailOpen className="w-4 h-4 text-muted-foreground" />;
      case "replied":
        return <Reply className="w-4 h-4 text-green-500" />;
      case "archived":
        return <Archive className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const stats = contactStore.getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">Manage contact form submissions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-500">
            {stats.new} New
          </span>
          <span className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground">
            {stats.total} Total
          </span>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
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
                <DropdownMenuItem onClick={() => setStatusFilter("new")}>New</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("read")}>Read</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("replied")}>Replied</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("archived")}>Archived</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Messages Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Inbox ({filteredMessages.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (msg.status === "new") {
                        handleStatusChange(msg.id, "read");
                      }
                    }}
                    className={`p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${
                      selectedMessage?.id === msg.id ? "bg-secondary" : ""
                    } ${msg.status === "new" ? "bg-blue-500/5" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      {getStatusIcon(msg.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <p className={`font-medium truncate ${msg.status === "new" ? "text-foreground" : "text-muted-foreground"}`}>
                              {msg.name}
                            </p>
                            {msg.language && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-500 uppercase shrink-0">
                                {msg.language}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {formatDate(msg.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground truncate">{msg.subject}</p>
                        <p className="text-xs text-muted-foreground truncate">{msg.email}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No messages found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Message Detail</CardTitle>
              {selectedMessage && (
                <Button variant="ghost" size="icon" onClick={() => setSelectedMessage(null)}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Header Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl font-semibold text-foreground">{selectedMessage.subject}</h3>
                    <div className="flex items-center gap-2">
                      {selectedMessage.language && (
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-500 uppercase">
                          {selectedMessage.language}
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedMessage.status === "new" ? "bg-blue-500/10 text-blue-500" :
                        selectedMessage.status === "replied" ? "bg-green-500/10 text-green-500" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {selectedMessage.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
                    <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`, '_blank')}
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    Reply via Email
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(selectedMessage.id, "replied")}
                  >
                    <MailOpen className="w-4 h-4 mr-2" />
                    Mark as Replied
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(selectedMessage.id, "archived")}
                  >
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(selectedMessage.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a message to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMessages;
