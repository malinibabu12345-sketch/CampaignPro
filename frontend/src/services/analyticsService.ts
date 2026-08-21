import type { AnalyticsResponse } from "../types/analytics";

const API_URL = "https://campaignpro.onrender.com/api/analytics";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const getAnalytics = async (): Promise<AnalyticsResponse> => {
  const response = await fetch(API_URL, {
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return response.json();
};