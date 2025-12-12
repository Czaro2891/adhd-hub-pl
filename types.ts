export enum PersonaType {
  ADULT = 'ADULT',
  PARENT = 'PARENT',
  PARTNER = 'PARTNER'
}

export interface PersonaContent {
  id: PersonaType;
  title: string;
  description: string;
  icon: string;
  colorClass: string;
}

export interface Article {
  id: string;
  title: string;
  category: string; // Display category
  targetPersona: PersonaType[]; // For filtering
  readTime: string;
  summary: string;
  content: string; // HTML-like string for the article body
  tags: string[];
  imageUrl?: string;
  status?: 'DRAFT' | 'PUBLISHED';
}

export interface TaskStep {
  text: string;
  isComplete: boolean;
}

// User & Auth
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
}

// Community / Forum
export interface ForumThread {
  id: string;
  title: string;
  author: string;
  date: string;
  category: 'Wsparcie' | 'Leki' | 'Praca' | 'Rodzina' | 'Strategie';
  content: string;
  likes: number;
  replies: number;
  tags: string[];
  isReported?: boolean;
}

// Diagnosis / Specialists
export interface Specialist {
  id: string;
  name: string;
  title: string; // np. Psychiatra, Psychoterapeuta
  city: string;
  specialization: string[];
  isVerified: boolean; // "Badge" zaufania
  isNFZ: boolean;
  contact: {
    phone?: string;
    website?: string;
  };
  description: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// Admin Stats
export interface AdminStats {
  usersCount: number;
  articlesCount: number;
  reportedThreads: number;
  pendingSpecialists: number;
}