export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  description: string;
  imageUrl: string;
  imagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  content: string;
  author: string;
  description: string;
  registrationLink: string;
  imageUrl: string;
  imagePublicId: string;
  date: Date;
  registrationStartDate?: Date | null;
  registrationEndDate?: Date | null;
  maxParticipants?: number | null;
  currentParticipants?: number | null;
  isRegistrationOpen: boolean;
  location?: string | null;
  eventType: EventType;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  name: string;
  domain: string;
  imageUrl: string;
  imagePublicId: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

export enum EventType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  HYBRID = 'HYBRID'
}

export interface EventRegistrationStatus {
  isOpen: boolean;
  message: string;
  canRegister: boolean;
  daysUntilStart?: number;
  daysUntilEnd?: number;
}
