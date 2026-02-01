import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminAuth } from "@/lib/adminStore";
import Logo from "@/components/Logo";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Mail, label: "Messages", path: "/admin/messages" },
  { icon: Users, label: "Subscribers", path: "/admin/subscribers" },
  { icon: MessageSquare, label: "Reviews", path: "/admin/reviews" },
  { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminAuth.isAuthenticated()) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    adminAuth.logout();
    navigate("/admin/login");
  };

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {sidebarOpen ? (
            <Link to="/" className="flex items-center gap-2">
              <Logo variant="default" size="sm" />
              <span className="font-heading text-lg font-bold">
                Admin<span className="text-primary">Panel</span>
              </span>
            </Link>
          ) : (
            <Link to="/" className="mx-auto">
              <Logo variant="default" size="sm" />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex"
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform ${sidebarOpen ? "rotate-180" : ""}`}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className={`w-full justify-start text-muted-foreground hover:text-foreground ${
              sidebarOpen ? "" : "px-3"
            }`}
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo variant="default" size="sm" />
            <span className="font-heading text-lg font-bold">
              Admin<span className="text-primary">Panel</span>
            </span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-4 ml-auto">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              View Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
