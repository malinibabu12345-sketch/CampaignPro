export interface EmailTemplate {
  id: string;
  userId: string;
  name: string;
  subject: string;
  htmlContent: string;
  placeholders?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface EmailTemplateRequest {
  name: string;
  subject: string;
  htmlContent: string;
  placeholders?: string[];
}