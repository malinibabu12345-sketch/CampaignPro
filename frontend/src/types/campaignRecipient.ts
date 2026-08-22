export interface CampaignRecipient {
  id: string;

  campaignId: string;

  contactId: string;

  email: string;

  status: string;

  retryCount: number;

  deliveredAt?: string;

  openedAt?: string;

  clickedAt?: string;
}