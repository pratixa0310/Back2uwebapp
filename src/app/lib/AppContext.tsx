import { createContext, useContext, useState, type ReactNode } from "react";
import { mockItems, mockUser, type Item, type User } from "./mockData";

interface AppContextType {
  items: Item[];
  user: User | null;
  isAuthenticated: boolean;
  addItem: (item: Omit<Item, "id" | "userId">) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addItem = (item: Omit<Item, "id" | "userId">) => {
    const newItem: Item = {
      ...item,
      id: `item-${Date.now()}`,
      userId: user?.id || "anonymous"
    };
    setItems([newItem, ...items]);
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const login = (email: string, password: string) => {
    // Mock login - in real app, this would call Supabase auth
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = (name: string, email: string, password: string) => {
    // Mock signup - in real app, this would call Supabase auth
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email
    };
    setUser(newUser);
    setIsAuthenticated(true);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        user,
        isAuthenticated,
        addItem,
        updateItem,
        deleteItem,
        login,
        logout,
        signup
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
