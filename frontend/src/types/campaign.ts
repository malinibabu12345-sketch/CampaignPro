export interface Campaign {
  id: string;
  userId: string;
  name: string;
  subject: string;
  templateId: string;
  status: string;
  scheduledAt?: string;
  sentAt?: string;
  totalRecipients: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CampaignRequest {
  name: string;
  subject: string;
  templateId: string;
  contactIds: string[];
  status?: string;
  scheduledAt?: string;
}