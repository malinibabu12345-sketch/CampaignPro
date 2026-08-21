export interface Contact {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  groupIds?: string[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  groupIds?: string[];
  status?: string;
}