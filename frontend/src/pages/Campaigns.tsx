import { useEffect, useState } from "react";
import type { Campaign } from "../types/campaign";
import type { EmailTemplate } from "../types/template";
import type { Contact } from "../types/contact";
import type { CampaignRecipient } from "../types/campaignRecipient";

import { getCampaigns, createCampaign, updateCampaign, deleteCampaign, 
  sendCampaign, getCampaignRecipients } from "../services/campaignService";

import { getTemplates } from "../services/templateService";
import { getContacts } from "../services/contactService";

function Campaigns() {

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [templateId, setTemplateId] = useState("");

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [recipients, setRecipients] = useState<CampaignRecipient[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

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
        selectedContacts.filter(
          (id) => id !== contactId
        )
      );
    } else {
      setSelectedContacts([
        ...selectedContacts,
        contactId
      ]);
    }
  };

  const resetForm = () => {
    setName("");
    setSubject("");
    setTemplateId("");
    setSelectedContacts([]);
    setEditingId(null);
  };

  const handleCreateOrUpdateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      if (editingId) {
        await updateCampaign(editingId, {
          name,
          subject,
          templateId,
          contactIds: selectedContacts,
          status: "DRAFT"
        });
        setMessage("Campaign updated successfully!");
      } else {
        await createCampaign({
          name,
          subject,
          templateId,
          contactIds: selectedContacts,
          status: "DRAFT"
        });
        setMessage("Campaign created successfully!");
      }
      resetForm();
      setShowForm(false);
      await loadData();

    } catch (err) {
      setError(
        editingId
          ? "Failed to update campaign"
          : "Failed to create campaign"
      );
    }
  };

  const handleEditCampaign = async (campaign: Campaign) => {
    try {
      setError("");
      const recipientData = await getCampaignRecipients(campaign.id);
      setEditingId(campaign.id);
      setName(campaign.name);
      setSubject(campaign.subject);
      setTemplateId(campaign.templateId);
      setSelectedContacts(recipientData.map(
          (recipient: CampaignRecipient) => recipient.contactId)
      );
      setShowForm(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    } catch (err) {
      setError("Failed to load campaign details");
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this campaign?"
    );
    if (!confirmed) {
      return;
    }
    try {
      setMessage("");
      setError("");
      await deleteCampaign(id);
      setMessage("Campaign deleted successfully!");
      await loadData();
    } catch (err) {
      setError("Failed to delete campaign");
    }
  };

  const handleSendCampaign = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to send this campaign?");
    if (!confirmed) {
      return;
    }
    try {
      setMessage("");
      setError("");
      await sendCampaign(id);
      setMessage("Campaign sent successfully!");
      await loadData();
    } catch (err) {
      setError("Failed to send campaign");
    }
  };

  const handleViewRecipients = async (campaignId: string) => {
    try {
      setError("");
      const data = await getCampaignRecipients(campaignId);
      setRecipients(data);
      setSelectedCampaignId(campaignId);
    } catch (err) {
      setError("Failed to load recipients");
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
          onClick={() => {

            resetForm();
            setShowForm(!showForm);

          }}
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

            {editingId ? "Edit Campaign" : "Create Campaign"}

          </h2>

          <form
            onSubmit={
              handleCreateOrUpdateCampaign
            }
          >

            <div className="mb-4">

              <label className="block mb-2 font-medium">
                Campaign Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
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
                onChange={(e) =>
                  setSubject(e.target.value)
                }
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
                onChange={(e) =>
                  setTemplateId(e.target.value)
                }
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

              ) : (contacts.map((contact) => (

                  <div
                    key={contact.id}
                    className="flex items-center gap-2 mb-2"
                  >

                    <input
                      type="checkbox"
                      checked={
                        selectedContacts.includes(
                          contact.id
                        )
                      }
                      onChange={() =>
                        handleContactChange(
                          contact.id
                        )
                      }
                    />

                    <span>

                      {contact.name}
                      {" "}
                      ({contact.email})

                    </span>

                  </div>

                ))
              )}
            </div>

            <div className="flex gap-3">

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
              >

                {editingId
                  ? "Update Campaign"
                  : "Create Campaign"}

              </button>

              <button
                type="button"
                onClick={() => {

                  resetForm();

                  setShowForm(false);

                }}
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
              >
                Cancel
              </button>

            </div>

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
                  Total Recipients:
                  {" "}
                  {campaign.totalRecipients}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">

                  {campaign.status !== "SENT" && (

                    <button
                      onClick={() =>
                        handleEditCampaign(campaign)
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>

                  )}

                  {campaign.status !== "SENT" && (

                    <button
                      onClick={() =>
                        handleSendCampaign(campaign.id)
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Send Campaign
                    </button>

                  )}

                  <button
                    onClick={() =>
                      handleViewRecipients(campaign.id)
                    }
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    View Recipients
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteCampaign(campaign.id)
                    }
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

      {selectedCampaignId && (

        <div className="bg-white rounded-lg shadow p-6 mt-8">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-xl font-semibold">
              Campaign Recipients
            </h2>

            <button
              onClick={() => {

                setSelectedCampaignId(null);

                setRecipients([]);

              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

          {recipients.length === 0 ? (

            <p className="text-gray-500">
              No recipients found.
            </p>

          ) : (

            <div className="space-y-3">

              {recipients.map((recipient) => (

                <div
                  key={recipient.id}
                  className="border rounded p-4"
                >

                  <p>
                    <strong>Email:</strong>
                    {" "}
                    {recipient.email}
                  </p>

                  <p>
                    <strong>Status:</strong>
                    {" "}
                    {recipient.status}
                  </p>

                  <p>
                    <strong>Retry Count:</strong>
                    {" "}
                    {recipient.retryCount}
                  </p>

                  <p>
                    <strong>Delivered:</strong>
                    {" "}
                    {recipient.deliveredAt
                      ? new Date(
                          recipient.deliveredAt
                        ).toLocaleString()
                      : "Not delivered"}
                  </p>

                  <p>
                    <strong>Opened:</strong>
                    {" "}
                    {recipient.openedAt
                      ? new Date(
                          recipient.openedAt
                        ).toLocaleString()
                      : "Not opened"}
                  </p>

                  <p>
                    <strong>Clicked:</strong>
                    {" "}
                    {recipient.clickedAt ? new Date(recipient.clickedAt).toLocaleString() : "Not clicked"}
                  </p>
                </div>
              ))}
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}
export default Campaigns;