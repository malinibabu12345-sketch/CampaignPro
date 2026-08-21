export interface Contact {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  category?: string;
}