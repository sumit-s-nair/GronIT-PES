import { Event, EventRegistrationStatus } from '@/types';

export const getEventRegistrationStatus = (event: Event): EventRegistrationStatus => {
  const now = new Date();
  const eventDate = new Date(event.date);
  
  // Check if event has already passed
  if (eventDate < now) {
    return {
      isOpen: false,
      message: 'Event has already concluded',
      canRegister: false
    };
  }

  // Check if registration is manually disabled
  if (!event.isRegistrationOpen) {
    return {
      isOpen: false,
      message: 'Registration is currently closed',
      canRegister: false
    };
  }

  // Check registration start date
  if (event.registrationStartDate) {
    const startDate = new Date(event.registrationStartDate);
    if (now < startDate) {
      const daysUntilStart = Math.ceil((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        isOpen: false,
        message: `Registration opens in ${daysUntilStart} day${daysUntilStart !== 1 ? 's' : ''}`,
        canRegister: false,
        daysUntilStart
      };
    }
  }

  // Check registration end date
  if (event.registrationEndDate) {
    const endDate = new Date(event.registrationEndDate);
    if (now > endDate) {
      return {
        isOpen: false,
        message: 'Registration deadline has passed',
        canRegister: false
      };
    }
    
    // Registration is still open but ending soon
    const daysUntilEnd = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilEnd <= 7) {
      return {
        isOpen: true,
        message: `Registration closes in ${daysUntilEnd} day${daysUntilEnd !== 1 ? 's' : ''}`,
        canRegister: true,
        daysUntilEnd
      };
    }
  }

  // Check maximum participants
  if (event.maxParticipants && event.currentParticipants) {
    if (event.currentParticipants >= event.maxParticipants) {
      return {
        isOpen: false,
        message: 'Event is full - registration closed',
        canRegister: false
      };
    }
    
    const spotsLeft = event.maxParticipants - event.currentParticipants;
    if (spotsLeft <= 10) {
      return {
        isOpen: true,
        message: `Only ${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left!`,
        canRegister: true
      };
    }
  }

  // Default case - registration is open
  return {
    isOpen: true,
    message: 'Registration is open',
    canRegister: true
  };
};

export const formatEventDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  }).format(new Date(date));
};

export const isEventUpcoming = (date: Date): boolean => {
  return new Date(date) > new Date();
};

export const getDaysUntilEvent = (date: Date): number => {
  const now = new Date();
  const eventDate = new Date(date);
  return Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};
