import type { EmailTemplate, EmailTemplateRequest } from "../types/template";

const API_URL = "https://campaignpro.onrender.com/api/templates";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const getTemplates = async (): Promise<EmailTemplate[]> => {
  const response = await fetch(API_URL, {
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch templates");
  }

  return response.json();
};

export const getTemplateById = async (
  id: string
): Promise<EmailTemplate> => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch template");
  }

  return response.json();
};

export const createTemplate = async (
  data: EmailTemplateRequest
): Promise<EmailTemplate> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to create template");
  }

  return response.json();
};

export const updateTemplate = async (
  id: string,
  data: EmailTemplateRequest
): Promise<EmailTemplate> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to update template");
  }

  return response.json();
};

export const deleteTemplate = async (
  id: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to delete template");
  }
};