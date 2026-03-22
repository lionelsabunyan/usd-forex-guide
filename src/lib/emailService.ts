import emailjs from '@emailjs/browser';

// EmailJS Configuration — values from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Template IDs
const TEMPLATES = {
  CONTACT: import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT || 'template_spjf2wq',
  REVIEW: import.meta.env.VITE_EMAILJS_TEMPLATE_REVIEW || 'template_v7s9u2c',
  LEAD_MAGNET: import.meta.env.VITE_EMAILJS_TEMPLATE_LEADMAGNET || '',
};

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

/**
 * Send contact form email notification
 */
export const sendContactNotification = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> => {
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATES.CONTACT, {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    });
    return true;
  } catch (error) {
    // Email sending failed - error handled by caller
    return false;
  }
};

/**
 * Send review notification email
 */
export const sendReviewNotification = async (data: {
  brokerName: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  title: string;
  review: string;
}): Promise<boolean> => {
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATES.REVIEW, {
      broker_name: data.brokerName,
      from_name: data.authorName,
      from_email: data.authorEmail,
      rating: data.rating,
      title: data.title,
      review: data.review,
    });
    return true;
  } catch (error) {
    // Email sending failed - error handled by caller
    return false;
  }
};

/**
 * Send lead magnet (US Forex Checklist) delivery email
 */
export const sendLeadMagnetEmail = async (data: {
  email: string;
  downloadLink?: string;
}): Promise<boolean> => {
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATES.LEAD_MAGNET, {
      to_email: data.email,
      download_link: data.downloadLink || 'https://beginnerfxguide.com/downloads/US-Forex-Checklist.pdf',
    });
    return true;
  } catch (error) {
    // Email sending failed - error handled by caller
    return false;
  }
};
