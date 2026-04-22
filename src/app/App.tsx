import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider";
import { AppProvider, useApp } from "./lib/AppContext";
import { Header } from "./components/Header";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Listings } from "./pages/Listings";
import { PostItem } from "./pages/PostItem";
import { ItemDetails } from "./pages/ItemDetails";
import { Dashboard } from "./pages/Dashboard";
import { Toaster } from "sonner";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
}

function AppRoutes() {
  const { isAuthenticated } = useApp();

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listings"
          element={
            <ProtectedRoute>
              <Listings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <PostItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/item/:id"
          element={
            <ProtectedRoute>
              <ItemDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground">
            <AppRoutes />
            <Toaster position="top-right" richColors />
          </div>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}