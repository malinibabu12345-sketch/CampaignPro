export interface ContactGroup {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactGroupRequest {
  name: string;
  description?: string;
}