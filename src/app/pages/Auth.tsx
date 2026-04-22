import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router";
import { useApp } from "../lib/AppContext";
import { toast } from "sonner";
import { FloatingElements } from "../components/FloatingElements";
import campusImage from "../../imports/Screenshot_2026-04-03_101413.png";

interface LoginForm {
  email: string;
  password: string;
}

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Auth() {
  const navigate = useNavigate();
  const { login, signup } = useApp();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginForm = useForm<LoginForm>();
  const signupForm = useForm<SignupForm>();

  const onLogin = async (data: LoginForm) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    login(data.email, data.password);
    toast.success("Welcome back!", {
      description: "You've successfully logged in"
    });

    setIsSubmitting(false);
    navigate("/");
  };

  const onSignup = async (data: SignupForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    signup(data.name, data.email, data.password);
    toast.success("Account created!", {
      description: "Welcome to BACK2U"
    });

    setIsSubmitting(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Floating Elements */}
      <FloatingElements />

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-30" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-gradient-to-br from-primary to-primary/80 p-4 rounded-2xl">
                  <Sparkles className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  BACK2U
                </h1>
                <p className="text-sm text-muted-foreground mt-1">Campus Lost & Found</p>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-3xl lg:text-4xl">
                Lost something?
                <br />
                <span className="text-muted-foreground">We'll bring it back to you.</span>
              </h2>
              <p className="text-muted-foreground max-w-md">
                Join our community-driven platform to report lost items, post found items,
                and help reunite students with their belongings.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              {[
                { icon: Shield, text: "Secure & Private", color: "text-green-500" },
                { icon: Zap, text: "Instant Notifications", color: "text-yellow-500" },
                { icon: Sparkles, text: "AI-Powered Matching", color: "text-purple-500" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 bg-muted rounded-lg">
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <span className="text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl blur-2xl" />

              <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl">
                {/* Tab Switcher */}
                <div className="flex gap-2 mb-8 bg-muted/50 p-1 rounded-xl">
                  <button
                    onClick={() => setMode("login")}
                    className={`flex-1 py-3 rounded-lg transition-all ${
                      mode === "login"
                        ? "bg-background shadow-sm"
                        : "hover:bg-background/50"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setMode("signup")}
                    className={`flex-1 py-3 rounded-lg transition-all ${
                      mode === "signup"
                        ? "bg-background shadow-sm"
                        : "hover:bg-background/50"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {mode === "login" ? (
                    <motion.form
                      key="login"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={loginForm.handleSubmit(onLogin)}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block mb-2">
                          <Mail className="inline h-4 w-4 mr-2" />
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="you@college.edu"
                          {...loginForm.register("email", { required: "Email is required" })}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                        />
                        {loginForm.formState.errors.email && (
                          <p className="text-sm text-destructive mt-2">
                            {loginForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block mb-2">
                          <Lock className="inline h-4 w-4 mr-2" />
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          {...loginForm.register("password", { required: "Password is required" })}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-sm text-destructive mt-2">
                            {loginForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2 group"
                      >
                        {isSubmitting ? "Logging in..." : "Login"}
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <p className="text-center text-sm text-muted-foreground">
                        Use <span className="text-primary font-medium">any email</span> to demo
                      </p>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="signup"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={signupForm.handleSubmit(onSignup)}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block mb-2">
                          <User className="inline h-4 w-4 mr-2" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          {...signupForm.register("name", { required: "Name is required" })}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                        />
                        {signupForm.formState.errors.name && (
                          <p className="text-sm text-destructive mt-2">
                            {signupForm.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block mb-2">
                          <Mail className="inline h-4 w-4 mr-2" />
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="you@college.edu"
                          {...signupForm.register("email", { required: "Email is required" })}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                        />
                        {signupForm.formState.errors.email && (
                          <p className="text-sm text-destructive mt-2">
                            {signupForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block mb-2">
                          <Lock className="inline h-4 w-4 mr-2" />
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          {...signupForm.register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                          })}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                        />
                        {signupForm.formState.errors.password && (
                          <p className="text-sm text-destructive mt-2">
                            {signupForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block mb-2">
                          <Lock className="inline h-4 w-4 mr-2" />
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          {...signupForm.register("confirmPassword", {
                            required: "Please confirm your password"
                          })}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl outline-none focus:border-primary transition-colors"
                        />
                        {signupForm.formState.errors.confirmPassword && (
                          <p className="text-sm text-destructive mt-2">
                            {signupForm.formState.errors.confirmPassword.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2 group"
                      >
                        {isSubmitting ? "Creating account..." : "Create Account"}
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <p className="text-center text-sm text-muted-foreground">
                        Demo mode - <span className="text-primary font-medium">no real registration required</span>
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
