import { useEffect, useState } from "react";
import { getContacts, createContact, updateContact, deleteContact } from "../services/contactService";
import type { Contact, ContactRequest } from "../types/contact";

function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error("Failed to load contacts", error);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setEditingId(null);
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const contactData: ContactRequest = {
      name,
      email,
      phone,
      company
    };

    try {
      if (editingId) {
        await updateContact(editingId, contactData);
        setMessage("Contact updated successfully!");
      } else {
        await createContact(contactData);
        setMessage("Contact created successfully!");
      }

      resetForm();

      await loadContacts();

    } catch (error) {
      console.error("Failed to save contact", error);

      setMessage("Failed to save contact");
    }
  };

  const handleEdit = (contact: Contact) => {
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone || "");
    setCompany(contact.company || "");

    setEditingId(contact.id);

    setMessage("");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id);

      setMessage("Contact deleted successfully!");

      await loadContacts();

    } catch (error) {
      console.error("Failed to delete contact", error);

      setMessage("Failed to delete contact");
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

      </div>

      {message && (

        <div className="bg-blue-100 text-blue-700 p-4 rounded mb-6">
          {message}
        </div>

      )}

      <div className="bg-white rounded-lg shadow p-6 mb-8">

        <h2 className="text-xl font-semibold mb-4">

          {editingId
            ? "Edit Contact"
            : "Add Contact"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            className="border p-3 rounded"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
            className="border p-3 rounded"
          />

          <div className="md:col-span-2 flex gap-3">

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
            >

              {editingId ? "Update Contact" : "Add Contact"}

            </button>

            {editingId && (

              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-5 py-3 rounded hover:bg-gray-600"
              >
                Cancel
              </button>

            )}

          </div>

        </form>

      </div>

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
                className="border rounded-lg p-4 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-lg font-semibold">
                    {contact.name}
                  </h3>

                  <p className="text-gray-600">
                    {contact.email}
                  </p>

                  {contact.phone && (

                    <p className="text-gray-500 text-sm">
                      Phone: {contact.phone}
                    </p>

                  )}

                  {contact.company && (

                    <p className="text-gray-500 text-sm">
                      Company: {contact.company}
                    </p>

                  )}

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => handleEdit(contact)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(contact.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
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

export default Contacts;