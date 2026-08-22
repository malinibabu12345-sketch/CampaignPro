import type { Contact, ContactRequest } from "../types/contact";

const API_URL = "https://campaignpro.onrender.com/api/contacts";
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const getContacts = async (): Promise<Contact[]> => {
  const response = await fetch(API_URL, {
    headers: getHeaders()
  });
  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }
  return response.json();
};

export const createContact = async (data: ContactRequest): Promise<Contact> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error("Failed to create contact");
  }
  return response.json();
};

export const deleteContact = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!response.ok) {
    throw new Error("Failed to delete contact");
  }
};

export const updateContact = async (
  id: string,
  data: ContactRequest): Promise<Contact> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error("Failed to update contact");
  }

  return response.json();
};