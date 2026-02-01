/**
 * Admin Store - LocalStorage-based data management for admin panel
 * This simulates a backend for contact messages, newsletter subscribers, and reviews
 * In production, replace with real API calls
 */

// Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "replied" | "archived";
  notes?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string; // footer, popup, etc.
  status: "active" | "unsubscribed";
}

export interface BrokerReview {
  id: string;
  brokerId: string;
  brokerName: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  title: string;
  review: string;
  pros: string;
  cons: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  isVerified: boolean;
}

export interface AnalyticsSnapshot {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  affiliateClicks: number;
  topPages: { path: string; views: number }[];
  topBrokers: { brokerId: string; clicks: number }[];
}

// Storage Keys
const STORAGE_KEYS = {
  CONTACTS: "admin_contacts",
  SUBSCRIBERS: "admin_subscribers",
  REVIEWS: "admin_reviews",
  ANALYTICS: "admin_analytics",
  ADMIN_AUTH: "admin_auth",
};

// Helper functions
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const getFromStorage = <T>(key: string): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Contact Messages
export const contactStore = {
  getAll: (): ContactMessage[] => {
    return getFromStorage<ContactMessage>(STORAGE_KEYS.CONTACTS).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  add: (message: Omit<ContactMessage, "id" | "createdAt" | "status">): ContactMessage => {
    const messages = getFromStorage<ContactMessage>(STORAGE_KEYS.CONTACTS);
    const newMessage: ContactMessage = {
      ...message,
      id: generateId(),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    messages.push(newMessage);
    saveToStorage(STORAGE_KEYS.CONTACTS, messages);
    return newMessage;
  },

  updateStatus: (id: string, status: ContactMessage["status"], notes?: string): void => {
    const messages = getFromStorage<ContactMessage>(STORAGE_KEYS.CONTACTS);
    const index = messages.findIndex((m) => m.id === id);
    if (index !== -1) {
      messages[index].status = status;
      if (notes) messages[index].notes = notes;
      saveToStorage(STORAGE_KEYS.CONTACTS, messages);
    }
  },

  delete: (id: string): void => {
    const messages = getFromStorage<ContactMessage>(STORAGE_KEYS.CONTACTS);
    saveToStorage(
      STORAGE_KEYS.CONTACTS,
      messages.filter((m) => m.id !== id)
    );
  },

  getStats: () => {
    const messages = getFromStorage<ContactMessage>(STORAGE_KEYS.CONTACTS);
    return {
      total: messages.length,
      new: messages.filter((m) => m.status === "new").length,
      read: messages.filter((m) => m.status === "read").length,
      replied: messages.filter((m) => m.status === "replied").length,
    };
  },
};

// Newsletter Subscribers
export const subscriberStore = {
  getAll: (): NewsletterSubscriber[] => {
    return getFromStorage<NewsletterSubscriber>(STORAGE_KEYS.SUBSCRIBERS).sort(
      (a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime()
    );
  },

  add: (email: string, source: string): NewsletterSubscriber | null => {
    const subscribers = getFromStorage<NewsletterSubscriber>(STORAGE_KEYS.SUBSCRIBERS);

    // Check if already subscribed
    if (subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
      return null;
    }

    const newSubscriber: NewsletterSubscriber = {
      id: generateId(),
      email,
      subscribedAt: new Date().toISOString(),
      source,
      status: "active",
    };
    subscribers.push(newSubscriber);
    saveToStorage(STORAGE_KEYS.SUBSCRIBERS, subscribers);
    return newSubscriber;
  },

  unsubscribe: (email: string): void => {
    const subscribers = getFromStorage<NewsletterSubscriber>(STORAGE_KEYS.SUBSCRIBERS);
    const index = subscribers.findIndex((s) => s.email.toLowerCase() === email.toLowerCase());
    if (index !== -1) {
      subscribers[index].status = "unsubscribed";
      saveToStorage(STORAGE_KEYS.SUBSCRIBERS, subscribers);
    }
  },

  delete: (id: string): void => {
    const subscribers = getFromStorage<NewsletterSubscriber>(STORAGE_KEYS.SUBSCRIBERS);
    saveToStorage(
      STORAGE_KEYS.SUBSCRIBERS,
      subscribers.filter((s) => s.id !== id)
    );
  },

  getStats: () => {
    const subscribers = getFromStorage<NewsletterSubscriber>(STORAGE_KEYS.SUBSCRIBERS);
    return {
      total: subscribers.length,
      active: subscribers.filter((s) => s.status === "active").length,
      unsubscribed: subscribers.filter((s) => s.status === "unsubscribed").length,
      thisMonth: subscribers.filter((s) => {
        const subDate = new Date(s.subscribedAt);
        const now = new Date();
        return subDate.getMonth() === now.getMonth() && subDate.getFullYear() === now.getFullYear();
      }).length,
    };
  },

  exportCSV: (): string => {
    const subscribers = getFromStorage<NewsletterSubscriber>(STORAGE_KEYS.SUBSCRIBERS);
    const headers = ["Email", "Subscribed At", "Source", "Status"];
    const rows = subscribers.map((s) => [s.email, s.subscribedAt, s.source, s.status]);
    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  },
};

// Broker Reviews
export const reviewStore = {
  getAll: (): BrokerReview[] => {
    return getFromStorage<BrokerReview>(STORAGE_KEYS.REVIEWS).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getByBroker: (brokerId: string): BrokerReview[] => {
    return getFromStorage<BrokerReview>(STORAGE_KEYS.REVIEWS)
      .filter((r) => r.brokerId === brokerId && r.status === "approved")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  add: (review: Omit<BrokerReview, "id" | "createdAt" | "status" | "isVerified">): BrokerReview => {
    const reviews = getFromStorage<BrokerReview>(STORAGE_KEYS.REVIEWS);
    const newReview: BrokerReview = {
      ...review,
      id: generateId(),
      createdAt: new Date().toISOString(),
      status: "pending",
      isVerified: false,
    };
    reviews.push(newReview);
    saveToStorage(STORAGE_KEYS.REVIEWS, reviews);
    return newReview;
  },

  updateStatus: (id: string, status: BrokerReview["status"]): void => {
    const reviews = getFromStorage<BrokerReview>(STORAGE_KEYS.REVIEWS);
    const index = reviews.findIndex((r) => r.id === id);
    if (index !== -1) {
      reviews[index].status = status;
      saveToStorage(STORAGE_KEYS.REVIEWS, reviews);
    }
  },

  verify: (id: string): void => {
    const reviews = getFromStorage<BrokerReview>(STORAGE_KEYS.REVIEWS);
    const index = reviews.findIndex((r) => r.id === id);
    if (index !== -1) {
      reviews[index].isVerified = true;
      saveToStorage(STORAGE_KEYS.REVIEWS, reviews);
    }
  },

  delete: (id: string): void => {
    const reviews = getFromStorage<BrokerReview>(STORAGE_KEYS.REVIEWS);
    saveToStorage(
      STORAGE_KEYS.REVIEWS,
      reviews.filter((r) => r.id !== id)
    );
  },

  getStats: () => {
    const reviews = getFromStorage<BrokerReview>(STORAGE_KEYS.REVIEWS);
    return {
      total: reviews.length,
      pending: reviews.filter((r) => r.status === "pending").length,
      approved: reviews.filter((r) => r.status === "approved").length,
      rejected: reviews.filter((r) => r.status === "rejected").length,
      averageRating:
        reviews.length > 0
          ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
          : "0",
    };
  },
};

// Simple Admin Authentication (for demo purposes - use proper auth in production)
export const adminAuth = {
  // Default credentials: admin / admin123
  login: (username: string, password: string): boolean => {
    // In production, this should be a secure API call
    const validUsername = "admin";
    const validPassword = "admin123";

    if (username === validUsername && password === validPassword) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify({
        authenticated: true,
        loginTime: new Date().toISOString(),
      }));
      return true;
    }
    return false;
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  },

  isAuthenticated: (): boolean => {
    try {
      const auth = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (!auth) return false;
      const { authenticated } = JSON.parse(auth);
      return authenticated === true;
    } catch {
      return false;
    }
  },
};

// Analytics helpers (simulated data for demo)
export const analyticsStore = {
  trackEvent: (eventType: string, data: Record<string, unknown>): void => {
    // In production, send to analytics service
    console.log("Analytics Event:", eventType, data);
  },

  getOverview: () => {
    // Simulated data - in production, fetch from GA API
    return {
      pageViews: Math.floor(Math.random() * 5000) + 1000,
      uniqueVisitors: Math.floor(Math.random() * 2000) + 500,
      affiliateClicks: Math.floor(Math.random() * 300) + 50,
      bounceRate: (Math.random() * 30 + 40).toFixed(1) + "%",
      avgSessionDuration: Math.floor(Math.random() * 180) + 60 + "s",
    };
  },
};
