import type {
  User,
  UserProfileRequest
} from "../types/user";

const API_URL = "https://campaignpro.onrender.com/api/users";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const getProfile = async (): Promise<User> => {
  const response = await fetch(`${API_URL}/profile`, {
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

export const updateProfile = async (
  data: UserProfileRequest
): Promise<User> => {

  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};