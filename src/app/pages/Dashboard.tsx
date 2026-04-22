import { motion } from "motion/react";
import { Package, Search, Heart, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router";
import { useApp } from "../lib/AppContext";
import { useState } from "react";
import { categoryLabels } from "../lib/mockData";

export function Dashboard() {
  const { items, user, deleteItem } = useApp();
  const [filter, setFilter] = useState<"all" | "lost" | "found">("all");

  const myItems = items.filter(item => item.userId === user?.id);
  const filteredMyItems = filter === "all" ? myItems : myItems.filter(item => item.status === filter);

  const stats = {
    total: myItems.length,
    lost: myItems.filter(i => i.status === "lost").length,
    found: myItems.filter(i => i.status === "found").length,
    claimed: myItems.filter(i => i.claimed).length
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteItem(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Manage your posted items here.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Posts", value: stats.total, icon: Package, color: "text-blue-500" },
            { label: "Lost Items", value: stats.lost, icon: Search, color: "text-orange-500" },
            { label: "Found Items", value: stats.found, icon: Package, color: "text-green-500" },
            { label: "Claimed", value: stats.claimed, icon: Heart, color: "text-pink-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl blur-md group-hover:blur-lg transition-all" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card transition-all">
                <stat.icon className={`h-6 w-6 mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Link
            to="/post"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
          >
            <Package className="h-4 w-4" />
            Post New Item
          </Link>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex gap-2 bg-muted/50 p-1 rounded-lg inline-flex">
            {[
              { value: "all", label: "All Items" },
              { value: "lost", label: "Lost" },
              { value: "found", label: "Found" }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value as typeof filter)}
                className={`px-6 py-2 rounded-md transition-all ${
                  filter === tab.value
                    ? "bg-background shadow-sm"
                    : "hover:bg-background/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Items List */}
        {filteredMyItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📭</div>
            <h3 className="mb-2">No items yet</h3>
            <p className="text-muted-foreground mb-6">
              {filter === "all"
                ? "You haven't posted any items yet."
                : `You don't have any ${filter} items posted.`}
            </p>
            <Link
              to="/post"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Post Your First Item
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredMyItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl blur-md group-hover:blur-lg transition-all" />
                <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          📦
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          item.status === "lost"
                            ? "bg-orange-500 text-white"
                            : "bg-green-500 text-white"
                        }`}>
                          {item.status === "lost" ? "Lost" : "Found"}
                        </span>
                      </div>

                      {item.claimed && (
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 rounded-md text-xs font-medium bg-blue-500 text-white">
                            Claimed
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <span>{categoryLabels[item.category]}</span>
                        <span>•</span>
                        <span>{item.location}</span>
                        <span>•</span>
                        <span>
                          {new Date(item.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/item/${item.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
