import { useState } from "react";
import {
  Settings,
  Key,
  Bell,
  Shield,
  Database,
  Trash2,
  Download,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { contactStore, subscriberStore, reviewStore } from "@/lib/adminStore";

const AdminSettings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoApproveReviews, setAutoApproveReviews] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleExportAll = () => {
    const data = {
      contacts: contactStore.getAll(),
      subscribers: subscriberStore.getAll(),
      reviews: reviewStore.getAll(),
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "All data has been exported successfully",
    });
  };

  const handleClearData = (type: string) => {
    if (!confirm(`Are you sure you want to clear all ${type}? This cannot be undone.`)) {
      return;
    }

    switch (type) {
      case "contacts":
        localStorage.removeItem("admin_contacts");
        break;
      case "subscribers":
        localStorage.removeItem("admin_subscribers");
        break;
      case "reviews":
        localStorage.removeItem("admin_reviews");
        break;
      case "all":
        localStorage.removeItem("admin_contacts");
        localStorage.removeItem("admin_subscribers");
        localStorage.removeItem("admin_reviews");
        break;
    }

    toast({
      title: "Data Cleared",
      description: `${type === "all" ? "All data" : type} has been cleared`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your admin panel settings</p>
      </div>

      {/* Settings Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              <CardTitle>Account Settings</CardTitle>
            </div>
            <CardDescription>Update your admin credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
            <Button className="w-full">Update Password</Button>
            <p className="text-xs text-muted-foreground text-center">
              Note: In this demo, password changes are not persisted
            </p>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive emails for new messages and reviews
                </p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Auto-approve Reviews</p>
                <p className="text-sm text-muted-foreground">
                  Automatically approve new reviews (not recommended)
                </p>
              </div>
              <Switch checked={autoApproveReviews} onCheckedChange={setAutoApproveReviews} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Maintenance Mode</p>
                <p className="text-sm text-muted-foreground">
                  Show maintenance page to visitors
                </p>
              </div>
              <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
            </div>
          </CardContent>
        </Card>

        {/* Site Configuration */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <CardTitle>Site Configuration</CardTitle>
            </div>
            <CardDescription>General site settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-email">Contact Email</Label>
              <Input id="site-email" type="email" defaultValue="info@beginnerfxguide.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ga-id">Google Analytics ID</Label>
              <Input id="ga-id" placeholder="G-XXXXXXXXXX" defaultValue="G-P860PCCF1T" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bing-uet">Bing UET Tag ID</Label>
              <Input id="bing-uet" placeholder="Enter your UET tag ID" />
            </div>
            <Button className="w-full">Save Configuration</Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Security and access settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 text-green-500 mb-2">
                <Shield className="w-4 h-4" />
                <span className="font-medium">SSL Active</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your site is secured with SSL encryption
              </p>
            </div>

            <div className="space-y-2">
              <Label>Last Login</Label>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleString()} from your current session
              </p>
            </div>

            <Button variant="outline" className="w-full">
              View Login History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            <CardTitle>Data Management</CardTitle>
          </div>
          <CardDescription>Export or clear stored data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Export */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Export Data</h4>
              <p className="text-sm text-muted-foreground">
                Download all your data as a JSON backup file
              </p>
              <Button variant="outline" onClick={handleExportAll} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Export All Data
              </Button>
            </div>

            {/* Clear Data */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Clear Data</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete stored data (cannot be undone)
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => handleClearData("contacts")}
                  className="w-full justify-start"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Contact Messages
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleClearData("subscribers")}
                  className="w-full justify-start"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Subscribers
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleClearData("reviews")}
                  className="w-full justify-start"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Reviews
                </Button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <div className="flex items-center gap-2 text-destructive mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Danger Zone</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              This action will permanently delete ALL stored data. This cannot be undone.
            </p>
            <Button variant="destructive" onClick={() => handleClearData("all")}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
