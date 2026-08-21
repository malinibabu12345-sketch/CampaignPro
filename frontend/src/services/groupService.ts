import type {
  ContactGroup,
  ContactGroupRequest
} from "../types/group";

const API_URL = "https://campaignpro.onrender.com/api/groups";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

export const getGroups = async (): Promise<ContactGroup[]> => {
  const response = await fetch(API_URL, {
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to fetch groups");
  }

  return response.json();
};

export const createGroup = async (
  data: ContactGroupRequest
): Promise<ContactGroup> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to create group");
  }

  return response.json();
};

export const deleteGroup = async (
  id: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Failed to delete group");
  }
};