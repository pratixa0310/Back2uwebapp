import { Home, Search, PlusCircle, User, LogOut, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { useApp } from "../lib/AppContext";
import { motion } from "motion/react";

export function Header() {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/listings", label: "Browse", icon: Search },
    { path: "/post", label: "Post Item", icon: PlusCircle },
    { path: "/dashboard", label: "Dashboard", icon: User }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover:blur-lg transition-all" />
              <div className="relative bg-gradient-to-br from-primary to-primary/70 text-primary-foreground p-2 rounded-lg">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                BACK2U
              </span>
              <p className="text-xs text-muted-foreground -mt-1">Lost & Found</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 rounded-lg transition-colors hover:bg-muted/50"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-muted rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user && (
              <div className="hidden sm:flex items-center gap-3 ml-2">
                <div className="text-right">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-around pb-2 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                  isActive ? "bg-muted" : "hover:bg-muted/50"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
