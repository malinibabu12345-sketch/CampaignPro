const API_URL = "https://campaignpro.onrender.com/api/tracking";

export const trackOpen = async (recipientId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/open/${recipientId}`,
    {
      method: "POST"
    }
  );
  if (!response.ok) {
    throw new Error("Failed to track email open");
  }
};


export const trackClick = async (recipientId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/click/${recipientId}`,
    {
      method: "POST"
    }
  );
  
  if (!response.ok) {
    throw new Error("Failed to track email click");
  }
};