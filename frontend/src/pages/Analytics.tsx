import { useEffect, useState } from "react";
import { getCampaigns } from "../services/campaignService";
import { getCampaignAnalytics } from "../services/analyticsService";

import type { Campaign } from "../types/campaign";
import type { AnalyticsResponse } from "../types/analytics";

function Analytics() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");

  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError("Failed to load campaigns");
    }
  };

  const handleCampaignChange = async (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setAnalytics(null);
    setError("");

    if (!campaignId) {
      return;
    }
    try {
      const data = await getCampaignAnalytics(campaignId);
      setAnalytics(data);
    } catch (err) {
      setError("Failed to load analytics");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Campaign Analytics
        </h1>

        <p className="text-gray-600 mt-2">
          View campaign performance
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">

        <label className="block font-medium mb-2">
          Select Campaign
        </label>

        <select
          value={selectedCampaignId}
          onChange={(e) =>
            handleCampaignChange(e.target.value)
          }
          className="w-full border border-gray-300 p-3 rounded"
        >
          <option value="">
            Select a campaign
          </option>

          {campaigns.map((campaign) => (
            <option
              key={campaign.id}
              value={campaign.id}
            >
              {campaign.name}
            </option>
          ))}
        </select>

      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">
              Emails Sent
            </h2>

            <p className="text-3xl font-bold mt-2">
              {analytics.totalEmailsSent}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">
              Delivered
            </h2>

            <p className="text-3xl font-bold mt-2">
              {analytics.totalDelivered}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Delivery Rate: {analytics.deliveryRate.toFixed(2)}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">
              Opened
            </h2>

            <p className="text-3xl font-bold mt-2">
              {analytics.totalOpened}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Open Rate: {analytics.openRate.toFixed(2)}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">
              Clicked
            </h2>

            <p className="text-3xl font-bold mt-2">
              {analytics.totalClicked}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Click Rate: {analytics.clickRate.toFixed(2)}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">
              Failed
            </h2>

            <p className="text-3xl font-bold mt-2">
              {analytics.totalFailed}
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

export default Analytics;