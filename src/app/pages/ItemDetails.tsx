import { motion } from "motion/react";
import { MapPin, Calendar, Tag, Mail, User, Phone, ArrowLeft, AlertCircle } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import { useApp } from "../lib/AppContext";
import { categoryLabels } from "../lib/mockData";
import { toast } from "sonner";
import { useState } from "react";

export function ItemDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, user, updateItem, deleteItem } = useApp();
  const [showContactInfo, setShowContactInfo] = useState(false);

  const item = items.find(i => i.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="mb-2">Item Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The item you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === item.userId;

  const handleClaimItem = () => {
    toast.success("Claim request sent!", {
      description: "The poster will be notified of your claim request"
    });
    setShowContactInfo(true);
  };

  const handleMarkAsClaimed = () => {
    updateItem(item.id, { claimed: true });
    toast.success("Item marked as claimed", {
      description: "Great news! The item has been reunited with its owner."
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteItem(item.id);
      toast.success("Post deleted successfully");
      navigate("/dashboard");
    }
  };

  const statusColors = {
    lost: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    found: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/listings"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl blur-2xl" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center bg-muted text-9xl">
                    📦
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm ${statusColors[item.status]}`}>
                    {item.status === "lost" ? "Lost Item" : "Found Item"}
                  </span>
                  {item.claimed && (
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 backdrop-blur-sm">
                      Claimed ✓
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl blur-2xl" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 space-y-6">
                <div>
                  <h1 className="mb-4">{item.title}</h1>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Tag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Category</div>
                      <div className="font-medium">{categoryLabels[item.category]}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="font-medium">{item.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Date {item.status === "lost" ? "Lost" : "Found"}
                      </div>
                      <div className="font-medium">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Posted by</div>
                      <div className="font-medium">{item.contactName}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Contact Card */}
            <div className="relative sticky top-24">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl blur-xl" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 space-y-6">
                <h3>Contact Information</h3>

                {isOwner ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-600 dark:text-blue-400">
                          This is your post. You'll be contacted if someone claims this item.
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {!item.claimed && (
                        <button
                          onClick={handleMarkAsClaimed}
                          className="w-full px-4 py-3 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors"
                        >
                          Mark as Claimed
                        </button>
                      )}
                      <button
                        onClick={handleDelete}
                        className="w-full px-4 py-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/20 transition-colors"
                      >
                        Delete Post
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {!showContactInfo ? (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Click below to view contact details and reach out to the poster.
                        </p>
                        <button
                          onClick={handleClaimItem}
                          disabled={item.claimed}
                          className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                          {item.claimed ? "Already Claimed" : "Claim This Item"}
                        </button>
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                          <div className="flex items-center gap-3">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-xs text-muted-foreground">Name</div>
                              <div className="font-medium">{item.contactName}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-xs text-muted-foreground">Email</div>
                              <a
                                href={`mailto:${item.contactEmail}`}
                                className="font-medium text-primary hover:underline"
                              >
                                {item.contactEmail}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div className="text-xs text-blue-600 dark:text-blue-400">
                              Please arrange a safe meeting location on campus to verify and exchange the item.
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
