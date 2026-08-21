import type {
  Campaign,
  CampaignRequest
} from "../types/campaign";

const API_URL = "https://campaignpro.onrender.com/api/campaign";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
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

export const createCampaign = async ( data: CampaignRequest
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