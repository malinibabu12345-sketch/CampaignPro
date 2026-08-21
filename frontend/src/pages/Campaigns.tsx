import { useEffect, useState } from "react";
import type { Campaign } from "../types/campaign";
import type { EmailTemplate } from "../types/template";
import type { Contact } from "../types/contact";

import {
  getCampaigns,
  createCampaign,
  deleteCampaign,
  sendCampaign
} from "../services/campaignService";

import { getTemplates } from "../services/templateService";
import { getContacts } from "../services/contactService";

function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const campaignData = await getCampaigns();
      const templateData = await getTemplates();
      const contactData = await getContacts();

      setCampaigns(campaignData);
      setTemplates(templateData);
      setContacts(contactData);
    } catch (err) {
      setError("Failed to load data");
    }
  };

  const handleContactChange = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(
        selectedContacts.filter((id) => id !== contactId)
      );
    } else {
      setSelectedContacts([
        ...selectedContacts,
        contactId
      ]);
    }
  };

  const handleCreateCampaign = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const newCampaign = await createCampaign({
        name,
        subject,
        templateId,
        contactIds: selectedContacts,
        status: "DRAFT"
      });

      setCampaigns([...campaigns, newCampaign]);

      setMessage("Campaign created successfully!");

      setName("");
      setSubject("");
      setTemplateId("");
      setSelectedContacts([]);

      setShowForm(false);

    } catch (err) {
      setError("Failed to create campaign");
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    try {
      setMessage("");
      setError("");

      await deleteCampaign(id);

      setCampaigns(
        campaigns.filter((campaign) => campaign.id !== id)
      );

      setMessage("Campaign deleted successfully!");

    } catch (err) {
      setError("Failed to delete campaign");
    }
  };

  const handleSendCampaign = async (id: string) => {
    try {
      setMessage("");
      setError("");

      await sendCampaign(id);

      setCampaigns(
        campaigns.map((campaign) =>
          campaign.id === id
            ? { ...campaign, status: "SENT" }
            : campaign
        )
      );

      setMessage("Campaign sent successfully!");

    } catch (err) {
      setError("Failed to send campaign");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Campaigns
          </h1>

          <p className="text-gray-600 mt-2">
            Create and manage email campaigns
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
        >
          + Create Campaign
        </button>

      </div>

      {message && (
        <p className="mb-4 text-green-600">
          {message}
        </p>
      )}

      {error && (
        <p className="mb-4 text-red-600">
          {error}
        </p>
      )}

      {showForm && (

        <div className="bg-white rounded-lg shadow p-6 mb-8">

          <h2 className="text-xl font-semibold mb-6">
            Create Campaign
          </h2>

          <form onSubmit={handleCreateCampaign}>

            <div className="mb-4">

              <label className="block mb-2 font-medium">
                Campaign Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-3 rounded"
                placeholder="Enter campaign name"
                required
              />

            </div>

            <div className="mb-4">

              <label className="block mb-2 font-medium">
                Email Subject
              </label>

              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border p-3 rounded"
                placeholder="Enter email subject"
                required
              />

            </div>

            <div className="mb-4">

              <label className="block mb-2 font-medium">
                Select Template
              </label>

              <select
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="w-full border p-3 rounded"
                required
              >

                <option value="">
                  Select a template
                </option>

                {templates.map((template) => (

                  <option
                    key={template.id}
                    value={template.id}
                  >
                    {template.name}
                  </option>

                ))}

              </select>

            </div>

            <div className="mb-6">

              <label className="block mb-3 font-medium">
                Select Contacts
              </label>

              {contacts.length === 0 ? (

                <p className="text-gray-500">
                  No contacts available.
                </p>

              ) : (

                contacts.map((contact) => (

                  <div
                    key={contact.id}
                    className="flex items-center gap-2 mb-2"
                  >

                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() =>
                        handleContactChange(contact.id)
                      }
                    />

                    <span>
                      {contact.name} ({contact.email})
                    </span>

                  </div>

                ))

              )}

            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Create Campaign
            </button>

          </form>

        </div>

      )}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          My Campaigns
        </h2>

        {campaigns.length === 0 ? (

          <p className="text-gray-500">
            No campaigns available.
          </p>

        ) : (

          <div className="space-y-4">

            {campaigns.map((campaign) => (

              <div
                key={campaign.id}
                className="border rounded p-4"
              >

                <h3 className="font-semibold text-lg">
                  {campaign.name}
                </h3>

                <p>
                  Subject: {campaign.subject}
                </p>

                <p>
                  Status: {campaign.status}
                </p>

                <p>
                  Total Recipients: {campaign.totalRecipients}
                </p>
                
                <div className="flex gap-3 mt-4">

                  {campaign.status !== "SENT" && (
                    <button
                      onClick={() => handleSendCampaign(campaign.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Send Campaign
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Campaigns;