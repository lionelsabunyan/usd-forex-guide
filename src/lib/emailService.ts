import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_h7k8rlu';
const EMAILJS_PUBLIC_KEY = '6_XN-2IB_gK754TNe';

// Template IDs
const TEMPLATES = {
  CONTACT: 'template_spjf2wq',
  REVIEW: 'template_v7s9u2c',
};

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

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
    console.log('Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send contact email:', error);
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
    console.log('Review email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send review email:', error);
    return false;
  }
};
