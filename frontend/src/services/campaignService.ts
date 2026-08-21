import type {
  Campaign,
  CampaignRequest
} from "../types/campaign";

const API_URL = "https://campaignpro.onrender.com/api/campaigns";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

export const getCampaigns = async (): Promise<Campaign[]> => {
  const response = await fetch(API_URL, {
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  return response.json();
};

export const createCampaign = async (
  data: CampaignRequest
): Promise<Campaign> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to create campaign");
  }

  return response.json();
};

export const updateCampaign = async (
  id: string,
  data: CampaignRequest
): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to update campaign");
  }

  return response.json();
};

export const deleteCampaign = async (
  id: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to delete campaign");
  }
};

export const sendCampaign = async (
  id: string
): Promise<string> => {
  const response = await fetch(`${API_URL}/${id}/send`, {
    method: "POST",
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to send campaign");
  }

  return response.text();
};