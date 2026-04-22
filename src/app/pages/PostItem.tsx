import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { Upload, X, MapPin, Calendar, Tag, FileText, User, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import { useApp } from "../lib/AppContext";
import { categoryLabels, locationOptions, type ItemStatus, type ItemCategory } from "../lib/mockData";
import { toast } from "sonner";

interface PostItemForm {
  title: string;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
  location: string;
  date: string;
  contactName: string;
  contactEmail: string;
}

export function PostItem() {
  const navigate = useNavigate();
  const { user, addItem } = useApp();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<PostItemForm>({
    defaultValues: {
      contactName: user?.name || "",
      contactEmail: user?.email || "",
      date: new Date().toISOString().split('T')[0]
    }
  });

  const status = watch("status");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PostItemForm) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    addItem({
      ...data,
      image: imagePreview || undefined,
      claimed: false
    });

    toast.success(
      status === "lost" ? "Lost item reported successfully!" : "Found item posted successfully!",
      {
        description: "Your post is now visible to the community"
      }
    );

    setIsSubmitting(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2">Post an Item</h1>
          <p className="text-muted-foreground">
            Help reunite lost items with their owners or find the owner of something you found
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl blur-2xl" />

          <div className="relative bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-xl space-y-6">
            {/* Status Selection */}
            <div>
              <label className="block mb-3">Item Status *</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    value="lost"
                    {...register("status", { required: "Please select a status" })}
                    className="peer sr-only"
                  />
                  <div className="p-6 border-2 border-border rounded-xl text-center transition-all peer-checked:border-orange-500 peer-checked:bg-orange-500/5 hover:bg-muted/50">
                    <div className="text-4xl mb-2">😢</div>
                    <div className="font-medium">I Lost Something</div>
                    <div className="text-sm text-muted-foreground mt-1">Report a lost item</div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    value="found"
                    {...register("status", { required: "Please select a status" })}
                    className="peer sr-only"
                  />
                  <div className="p-6 border-2 border-border rounded-xl text-center transition-all peer-checked:border-green-500 peer-checked:bg-green-500/5 hover:bg-muted/50">
                    <div className="text-4xl mb-2">🎉</div>
                    <div className="font-medium">I Found Something</div>
                    <div className="text-sm text-muted-foreground mt-1">Post a found item</div>
                  </div>
                </label>
              </div>
              {errors.status && (
                <p className="text-sm text-destructive mt-2">{errors.status.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-3">
                <Upload className="inline h-4 w-4 mr-2" />
                Item Photo
              </label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview("")}
                    className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <span className="text-sm text-muted-foreground">Click to upload an image</span>
                  <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block mb-3">
                <FileText className="inline h-4 w-4 mr-2" />
                Item Title *
              </label>
              <input
                type="text"
                placeholder="e.g., iPhone 14 Pro, Student ID Card, Blue Backpack"
                {...register("title", {
                  required: "Title is required",
                  minLength: { value: 3, message: "Title must be at least 3 characters" }
                })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
              />
              {errors.title && (
                <p className="text-sm text-destructive mt-2">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block mb-3">
                <FileText className="inline h-4 w-4 mr-2" />
                Description *
              </label>
              <textarea
                rows={4}
                placeholder="Provide details like color, brand, distinguishing features, when and where you lost/found it..."
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 10, message: "Description must be at least 10 characters" }
                })}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors resize-none"
              />
              {errors.description && (
                <p className="text-sm text-destructive mt-2">{errors.description.message}</p>
              )}
            </div>

            {/* Category and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-3">
                  <Tag className="inline h-4 w-4 mr-2" />
                  Category *
                </label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a category</option>
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-destructive mt-2">{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-3">
                  <MapPin className="inline h-4 w-4 mr-2" />
                  Location *
                </label>
                <select
                  {...register("location", { required: "Location is required" })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a location</option>
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className="text-sm text-destructive mt-2">{errors.location.message}</p>
                )}
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block mb-3">
                <Calendar className="inline h-4 w-4 mr-2" />
                Date {status === "lost" ? "Lost" : "Found"} *
              </label>
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
              />
              {errors.date && (
                <p className="text-sm text-destructive mt-2">{errors.date.message}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-3">
                  <User className="inline h-4 w-4 mr-2" />
                  Your Name *
                </label>
                <input
                  type="text"
                  {...register("contactName", { required: "Name is required" })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                />
                {errors.contactName && (
                  <p className="text-sm text-destructive mt-2">{errors.contactName.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-3">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Your Email *
                </label>
                <input
                  type="email"
                  {...register("contactEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                />
                {errors.contactEmail && (
                  <p className="text-sm text-destructive mt-2">{errors.contactEmail.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-border">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? "Posting..." : `Post ${status === "lost" ? "Lost" : "Found"} Item`}
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
