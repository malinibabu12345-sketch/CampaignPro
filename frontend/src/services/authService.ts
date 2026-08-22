import type { RegisterRequest, LoginRequest, LoginResponse } from "../types/auth";

const API_URL = "https://campaignpro.onrender.com/api/auth";

export const registerUser = async (data: RegisterRequest) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Registration failed");
  }

  return response.text();
};

export const loginUser = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();

};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};