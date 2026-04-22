import { motion } from "motion/react";
import { Search, Package, Heart, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useApp } from "../lib/AppContext";
import { ItemCard } from "../components/ItemCard";
import { Footer } from "../components/Footer";
import { SearchIllustration } from "../components/illustrations/SearchIllustration";
import { useState } from "react";
import campusImage from "../../imports/Screenshot_2026-04-03_101413.png";

export function Home() {
  const { items } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const recentItems = items.slice(0, 6);
  const lostCount = items.filter(i => i.status === "lost").length;
  const foundCount = items.filter(i => i.status === "found").length;
  const claimedCount = items.filter(i => i.claimed).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/listings?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh]">
        {/* Campus Background Image */}
        <div className="absolute inset-0">
          <img
            src={campusImage}
            alt="Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85 dark:from-background/98 dark:via-background/95 dark:to-background/90" />
        </div>

        {/* Decorative overlays */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm">Powered by BACK2U</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 text-4xl sm:text-5xl lg:text-6xl"
            >
              Lost Something?
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/70 bg-clip-text text-transparent">
                We'll Bring It BACK2U
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Join our community-driven platform to report lost items, post found items,
              and help reunite students with their belongings.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              onSubmit={handleSearch}
              className="max-w-xl mx-auto mb-8"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-xl p-2 shadow-lg">
                  <Search className="h-5 w-5 text-muted-foreground ml-2" />
                  <input
                    type="text"
                    placeholder="Search for lost items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none px-2 py-2"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/post"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Report Lost Item
              </Link>
              <Link
                to="/listings"
                className="px-6 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all hover:scale-105"
              >
                Browse Items
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto"
          >
            {[
              { label: "Items Lost", value: lostCount, icon: Search, color: "text-orange-500" },
              { label: "Items Found", value: foundCount, icon: Package, color: "text-green-500" },
              { label: "Successfully Reunited", value: claimedCount, icon: Heart, color: "text-pink-500" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl blur-md group-hover:blur-lg transition-all" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:bg-card/80 transition-all">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Items */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="mb-2">Recent Posts</h2>
            <p className="text-muted-foreground">Latest lost and found items from our community</p>
          </div>
          <Link
            to="/listings"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            View All
            <TrendingUp className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ItemCard item={item} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to help reunite students with their lost belongings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Report or Post",
                description: "Lost something? Report it. Found something? Post it with details and photos.",
                icon: "📝",
                gradient: "from-blue-500/20 to-blue-600/10"
              },
              {
                step: "02",
                title: "Search & Match",
                description: "Browse listings, use filters, and search for your item across categories.",
                icon: "🔍",
                gradient: "from-purple-500/20 to-purple-600/10"
              },
              {
                step: "03",
                title: "Connect & Claim",
                description: "Contact the poster and arrange a safe meetup to reclaim your item.",
                icon: "🤝",
                gradient: "from-green-500/20 to-green-600/10"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-lg group-hover:blur-xl transition-all`} />
                <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-xl p-8 hover:border-primary/50 transition-all">
                  <motion.div
                    className="text-6xl mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div className="text-sm text-primary font-medium mb-2">STEP {feature.step}</div>
                  <h3 className="mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
