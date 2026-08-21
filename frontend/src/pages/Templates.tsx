import { useEffect, useState } from "react";
import {
  getTemplates,
  createTemplate,
  deleteTemplate
} from "../services/templateService";

import type {
  EmailTemplate,
  EmailTemplateRequest
} from "../types/template";

function Templates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTemplates();
      setTemplates(data);
    } catch (err) {
      setError("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleCreateTemplate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const data: EmailTemplateRequest = {
        name,
        subject,
        htmlContent
      };

      await createTemplate(data);

      setName("");
      setSubject("");
      setHtmlContent("");

      setShowForm(false);

      await loadTemplates();

    } catch (err) {
      setError("Failed to create template");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTemplate(id);

      await loadTemplates();

    } catch (err) {
      setError("Failed to delete template");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Email Templates
          </h1>

          <p className="text-gray-600 mt-2">
            Manage email templates
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "+ Create Template"}
        </button>

      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {showForm && (

        <form
          onSubmit={handleCreateTemplate}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >

          <h2 className="text-xl font-semibold mb-4">
            Create Template
          </h2>

          <input
            type="text"
            placeholder="Template Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded mb-4"
            required
          />

          <input
            type="text"
            placeholder="Email Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border p-3 rounded mb-4"
            required
          />

          <textarea
            placeholder="Email Content"
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            className="w-full border p-3 rounded mb-4 h-32"
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700"
          >
            Save Template
          </button>

        </form>

      )}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          My Templates
        </h2>

        {loading && (
          <p className="text-gray-500">
            Loading templates...
          </p>
        )}

        {!loading && templates.length === 0 && (
          <p className="text-gray-500">
            No templates available.
          </p>
        )}

        <div className="space-y-4">

          {templates.map((template) => (

            <div
              key={template.id}
              className="border rounded p-4 flex justify-between items-start"
            >

              <div>
                <h3 className="font-bold text-lg">
                  {template.name}
                </h3>

                <p className="text-gray-600 mt-1">
                  Subject: {template.subject}
                </p>

                <p className="text-gray-500 mt-2">
                  {template.htmlContent}
                </p>
              </div>

              <button
                onClick={() => handleDelete(template.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Templates;