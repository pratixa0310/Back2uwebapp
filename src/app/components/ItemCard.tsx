import { MapPin, Calendar, Tag } from "lucide-react";
import { Link } from "react-router";
import type { Item } from "../lib/mockData";
import { categoryLabels } from "../lib/mockData";
import { motion } from "motion/react";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const statusColors = {
    lost: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    found: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
  };

  return (
    <Link to={`/item/${item.id}`} className="block group">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-full"
      >
        {/* Glassmorphism glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Card */}
        <div className="relative h-full bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl">
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-muted">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                📦
              </div>
            )}

            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <motion.span
                className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${statusColors[item.status]} inline-block`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {item.status === "lost" ? "🔍 Lost" : "✨ Found"}
              </motion.span>
            </div>

            {/* Claimed Badge */}
            {item.claimed && (
              <div className="absolute top-3 left-3">
                <motion.span
                  className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 backdrop-blur-sm inline-block"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  Claimed ✓
                </motion.span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {item.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {item.description}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{categoryLabels[item.category]}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Posted by <span className="text-foreground font-medium">{item.contactName}</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
