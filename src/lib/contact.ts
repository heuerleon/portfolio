export type ContactFormRequestData = {
  name: string;
  subject: string;
  email: string;
  message: string;
  token: string;
};

export const limits = {
  name: 50,
  subject: 100,
  email: 50,
  message: 500,
} as const;
