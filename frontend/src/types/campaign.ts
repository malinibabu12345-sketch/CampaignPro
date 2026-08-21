export interface Campaign {
  id: string;
  userId: string;
  name: string;
  templateId: string;
  groupId?: string;
  status: string;
  scheduledAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CampaignRequest {
  name: string;
  templateId: string;
  groupId?: string;
  scheduledAt?: string;
}