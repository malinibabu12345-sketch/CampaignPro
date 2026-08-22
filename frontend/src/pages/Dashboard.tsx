import { useEffect, useState } from "react";

import { getTemplates } from "../services/templateService";
import { getContacts } from "../services/contactService";
import { getCampaigns } from "../services/campaignService";

import type { Campaign } from "../types/campaign";

function Dashboard() {
  const [templateCount, setTemplateCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const templates = await getTemplates();
      const contacts = await getContacts();
      const campaignData = await getCampaigns();

      setTemplateCount(templates.length);
      setContactCount(contacts.length);
      setCampaignCount(campaignData.length);

      setCampaigns(campaignData);

      const drafts = campaignData.filter(
        (campaign) => campaign.status === "DRAFT"
      );

      const sent = campaignData.filter(
        (campaign) => campaign.status === "SENT"
      );

      setDraftCount(drafts.length);
      setSentCount(sent.length);

    } catch (error) {
      console.error("Failed to load dashboard", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Overview of your CampaignPro account
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">
            Templates
          </h2>

          <p className="text-3xl font-bold mt-2">
            {templateCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">
            Contacts
          </h2>

          <p className="text-3xl font-bold mt-2">
            {contactCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">
            Campaigns
          </h2>

          <p className="text-3xl font-bold mt-2">
            {campaignCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">
            Draft Campaigns
          </h2>

          <p className="text-3xl font-bold mt-2">
            {draftCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-gray-500">
            Sent Campaigns
          </h2>

          <p className="text-3xl font-bold mt-2">
            {sentCount}
          </p>
        </div>

      </div>

      <div className="mt-10 bg-white shadow rounded-lg p-6">

        <h2 className="text-xl font-semibold mb-6">
          Recent Campaigns
        </h2>

        {campaigns.length === 0 ? (

          <p className="text-gray-500">
            No campaigns available.
          </p>

        ) : (

          <div className="space-y-4">

            {campaigns.slice(0, 5).map((campaign) => (

              <div
                key={campaign.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-lg font-semibold">
                    {campaign.name}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    Subject: {campaign.subject || "No subject"}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    Total Recipients: {campaign.totalRecipients || 0}
                  </p>

                </div>

                <div>

                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      campaign.status === "SENT"
                        ? "bg-green-100 text-green-700"
                        : campaign.status === "DRAFT"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {campaign.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;