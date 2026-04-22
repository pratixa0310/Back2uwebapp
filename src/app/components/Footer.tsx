import { motion } from "motion/react";
import { Sparkles, Heart, Mail, Github, Twitter } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-muted/30 to-background border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md" />
                <div className="relative bg-gradient-to-br from-primary to-primary/70 p-2 rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  BACK2U
                </span>
                <p className="text-xs text-muted-foreground">Campus Lost & Found</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Bringing lost items back to their owners through the power of community.
              Join thousands of students helping each other reunite with their belongings.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
              <span>for campus communities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/post" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Post Item
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 BACK2U. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Github"
            >
              <Github className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-purple-500/50 to-pink-500/50" />
    </footer>
  );
}
