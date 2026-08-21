import { useEffect, useState } from "react";
import type { Contact, ContactRequest } from "../types/contact";
import {
  getContacts,
  createContact,
  deleteContact
} from "../services/contactService";

function Contacts() {

  const [contacts, setContacts] = useState<Contact[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setError("");

      const data = await getContacts();

      setContacts(data);

    } catch (err) {
      setError("Failed to load contacts");
    }
  };

  const handleCreate = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const contactData: ContactRequest = {
        name,
        email,
        phone,
        company,
        status: "ACTIVE"
      };

      await createContact(contactData);

      setMessage("Contact added successfully!");

      setName("");
      setEmail("");
      setPhone("");
      setCompany("");

      setShowForm(false);

      loadContacts();

    } catch (err) {

      setError("Failed to add contact");

    }
  };

  const handleDelete = async (id: string) => {

    try {

      await deleteContact(id);

      setMessage("Contact deleted successfully!");

      loadContacts();

    } catch (err) {

      setError("Failed to delete contact");

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Contacts
          </h1>

          <p className="text-gray-600 mt-2">
            Manage email contacts
          </p>

        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "+ Add Contact"}
        </button>

      </div>

      {message && (
        <div className="bg-green-100 text-green-700 p-4 mb-6 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}

      {showForm && (

        <div className="bg-white rounded-lg shadow p-6 mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Add Contact
          </h2>

          <form onSubmit={handleCreate}>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded mb-4"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded mb-4"
              required
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-3 rounded mb-4"
            />

            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border p-3 rounded mb-4"
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700"
            >
              Save Contact
            </button>

          </form>

        </div>

      )}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          My Contact List
        </h2>

        {contacts.length === 0 ? (

          <p className="text-gray-500">
            No contacts available.
          </p>

        ) : (

          <div className="space-y-4">

            {contacts.map((contact) => (

              <div
                key={contact.id}
                className="border p-4 rounded flex justify-between items-center"
              >

                <div>

                  <h3 className="text-lg font-semibold">
                    {contact.name}
                  </h3>

                  <p className="text-gray-600">
                    {contact.email}
                  </p>

                  {contact.phone && (
                    <p className="text-gray-600">
                      Phone: {contact.phone}
                    </p>
                  )}

                  {contact.company && (
                    <p className="text-gray-600">
                      Company: {contact.company}
                    </p>
                  )}

                </div>

                <button
                  onClick={() => handleDelete(contact.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default Contacts;