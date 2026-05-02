export type ItemStatus = "lost" | "found";
export type ItemCategory = "electronics" | "id-cards" | "books" | "clothing" | "accessories" | "keys" | "other";

export interface Item {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  status: ItemStatus;
  location: string;
  date: string;
  image?: string;
  contactName: string;
  contactEmail: string;
  userId: string;
  claimed?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const mockUser: User = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex.johnson@college.edu",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
};

export const mockItems: Item[] = [
  {
    id: "1",
    title: "iPhone 14 Pro",
    description: "Black iPhone 14 Pro with a purple case. Lost near the library on April 18th. Has a small crack on the screen.",
    category: "electronics",
    status: "lost",
    location: "Library",
    date: "2026-04-18",
    image: "https://images.unsplash.com/photo-1678652197854-0b8e9f0b6d6e?w=400&h=300&fit=crop",
    contactName: "Sarah Miller",
    contactEmail: "sarah.m@college.edu",
    userId: "user-2"
  },
  {
    id: "2",
    title: "Student ID Card",
    description: "Found a student ID card with the name 'Michael Chen' on it. Found in the cafeteria.",
    category: "id-cards",
    status: "found",
    location: "Canteen",
    date: "2026-04-20",
    image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=400&h=300&fit=crop",
    contactName: "Emma Davis",
    contactEmail: "emma.d@college.edu",
    userId: "user-3"
  },
  {
    id: "3",
    title: "Calculus Textbook",
    description: "Stewart's Calculus, 8th Edition. Has my name and notes inside. Lost in SCE building.",
    category: "books",
    status: "lost",
    location: "SCE",
    date: "2026-04-19",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=300&fit=crop",
    contactName: "James Wilson",
    contactEmail: "james.w@college.edu",
    userId: "user-4"
  },
  {
    id: "4",
    title: "Blue Water Bottle",
    description: "Found a blue Hydro Flask water bottle near the volleyball ground. Has some stickers on it.",
    category: "other",
    status: "found",
    location: "Volleyball Ground",
    date: "2026-04-21",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
    contactName: "Lisa Anderson",
    contactEmail: "lisa.a@college.edu",
    userId: "user-5"
  },
  {
    id: "5",
    title: "AirPods Pro",
    description: "Lost my AirPods Pro with charging case. Last seen in SETI building.",
    category: "electronics",
    status: "lost",
    location: "SETI",
    date: "2026-04-17",
    image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=300&fit=crop",
    contactName: "David Brown",
    contactEmail: "david.b@college.edu",
    userId: "user-6"
  },
  {
    id: "6",
    title: "Black Backpack",
    description: "Found a black North Face backpack in the MBBS parking lot. Contains some notebooks and a laptop.",
    category: "other",
    status: "found",
    location: "MBBS Parking",
    date: "2026-04-21",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    contactName: mockUser.name,
    contactEmail: mockUser.email,
    userId: mockUser.id
  },
  {
    id: "7",
    title: "House Keys with Keychain",
    description: "Lost my keys with a red keychain that says 'Lucky'. Has about 5 keys on it.",
    category: "keys",
    status: "lost",
    location: "SETI Corridor",
    date: "2026-04-20",
    image: "https://images.unsplash.com/photo-1582139329536-9f98febd9155?w=400&h=300&fit=crop",
    contactName: "Rachel Green",
    contactEmail: "rachel.g@college.edu",
    userId: "user-7"
  },
  {
    id: "8",
    title: "Gray Hoodie",
    description: "Found a gray Champion hoodie near the cricket ground. Size M.",
    category: "clothing",
    status: "found",
    location: "Cricket Ground",
    date: "2026-04-19",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
    contactName: "Tom Harris",
    contactEmail: "tom.h@college.edu",
    userId: "user-8"
  }
];

export const categoryLabels: Record<ItemCategory, string> = {
  "electronics": "Electronics",
  "id-cards": "ID Cards",
  "books": "Books",
  "clothing": "Clothing",
  "accessories": "Accessories",
  "keys": "Keys",
  "other": "Other"
};

export const locationOptions = [
  "SCE",
  "SETI",
  "SETI Corridor",
  "SALITER",
  "SIP",
  "SCP",
  "SID",
  "Architecture",
  "Volleyball Ground",
  "Hospital/MBBS",
  "MBBS Parking",
  "Cricket Ground",
  "Canteen",
  "Basketball Court",
  "Main Gate",
  "Administrative Block",
  "Library",
  "Auditorium",
  "Workshop Area",
  "Boys Hostel",
  "Girls Hostel",
  "Faculty Block"
];
