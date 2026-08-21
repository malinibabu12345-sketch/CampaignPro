import type { AdminAnalyticsResponse } from "../types/admin";

const API_URL = "https://campaignpro.onrender.com/api/admin";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const getAdminAnalytics = async (): Promise<AdminAnalyticsResponse> => {

    const response = await fetch(
      `${API_URL}/analytics`,
      {
        headers: getHeaders()
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch admin analytics");
    }

    return response.json();
  };