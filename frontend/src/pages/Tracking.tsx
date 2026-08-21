import { useState } from "react";
import { trackOpen, trackClick } from "../services/trackingService";

function Tracking() {
  const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");

  const handleTrackOpen = async () => {
    try {
      await trackOpen(recipientId);
      setMessage("Email open tracked successfully!");
    } catch (error) {
      setMessage("Failed to track email open");
    }
  };

  const handleTrackClick = async () => {
    try {
      await trackClick(recipientId);
      setMessage("Email click tracked successfully!");
    } catch (error) {
      setMessage("Failed to track email click");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">
          Email Tracking
        </h1>

        <p className="text-gray-600 mt-2 mb-6">
          Track email opens and clicks
        </p>

        <div className="bg-white rounded-lg shadow p-6">
          <label className="block font-medium mb-2">
            Campaign Recipient ID
          </label>

          <input
            type="text"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            placeholder="Enter recipient ID"
            className="w-full border rounded px-4 py-3 mb-4"
          />

          <div className="flex gap-4">
            <button
              onClick={handleTrackOpen}
              className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
            >
              Track Open
            </button>

            <button
              onClick={handleTrackClick}
              className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700"
            >
              Track Click
            </button>
          </div>

          {message && (
            <p className="mt-4 text-green-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tracking;