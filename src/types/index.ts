import { Event, Blog, TeamMember, EventType } from '@prisma/client';

export type { Blog, Event };
export { EventType };

export interface TeamMemberWithSocialLinks extends Omit<TeamMember, 'socialLinks'> {
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  } | null;
}

// Keep the original TeamMember interface for backwards compatibility
export type { TeamMember };

export interface EventRegistrationStatus {
  isOpen: boolean;
  message: string;
  canRegister: boolean;
  daysUntilStart?: number;
  daysUntilEnd?: number;
}
