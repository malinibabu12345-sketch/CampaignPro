import { useEffect, useState } from "react";

import type {
  ContactGroup,
  ContactGroupRequest
} from "../types/group";

import {
  getGroups,
  createGroup,
  deleteGroup
} from "../services/groupService";

function Groups() {

  const [groups, setGroups] = useState<ContactGroup[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadGroups = async () => {
    try {
      setError("");

      const data = await getGroups();

      setGroups(data);

    } catch (err) {
      setError("Failed to load groups");
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleCreate = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const groupData: ContactGroupRequest = {
        name,
        description
      };

      await createGroup(groupData);

      setMessage("Group created successfully!");

      setName("");
      setDescription("");

      setShowForm(false);

      loadGroups();

    } catch (err) {

      setError("Failed to create group");

    }
  };

  const handleDelete = async (id: string) => {

    try {

      setMessage("");
      setError("");

      await deleteGroup(id);

      setMessage("Group deleted successfully!");

      loadGroups();

    } catch (err) {

      setError("Failed to delete group");

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Contact Groups
          </h1>

          <p className="text-gray-600 mt-2">
            Organize contacts into groups
          </p>

        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "+ Create Group"}
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
            Create Group
          </h2>

          <form onSubmit={handleCreate}>

            <input
              type="text"
              placeholder="Group Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded mb-4"
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-3 rounded mb-4"
              rows={4}
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-3 rounded hover:bg-green-700"
            >
              Save Group
            </button>

          </form>

        </div>

      )}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-xl font-semibold mb-4">
          My Groups
        </h2>

        {groups.length === 0 ? (

          <p className="text-gray-500">
            No groups available.
          </p>

        ) : (

          <div className="space-y-4">

            {groups.map((group) => (

              <div
                key={group.id}
                className="border p-4 rounded flex justify-between items-center"
              >

                <div>

                  <h3 className="text-lg font-semibold">
                    {group.name}
                  </h3>

                  {group.description && (
                    <p className="text-gray-600 mt-1">
                      {group.description}
                    </p>
                  )}

                </div>

                <button
                  onClick={() => handleDelete(group.id)}
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

export default Groups;