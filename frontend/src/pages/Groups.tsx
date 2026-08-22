import { useEffect, useState } from "react";
import { getGroups, createGroup, updateGroup, deleteGroup } from "../services/groupService";
import type { ContactGroup, ContactGroupRequest } from "../types/group";

function Groups() {
  const [groups, setGroups] = useState<ContactGroup[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const data = await getGroups();
      setGroups(data);
    } catch (error) {
      console.error("Failed to load groups", error);
      setMessage("Failed to load groups");
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const groupData: ContactGroupRequest = {
      name,
      description
    };

    try {
      if (editingId) {
        await updateGroup(editingId, groupData);
        setMessage("Group updated successfully!");
      } else {
        await createGroup(groupData);
        setMessage("Group created successfully!");
      }

      resetForm();
      await loadGroups();

    } catch (error) {
      console.error("Failed to save group", error);
      setMessage("Failed to save group");
    }
  };

  const handleEdit = (group: ContactGroup) => {
    setName(group.name);
    setDescription(group.description || "");
    setEditingId(group.id);
    setMessage("");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGroup(id);
      setMessage("Group deleted successfully!");
      if (editingId === id) {
        resetForm();
      }

      await loadGroups();

    } catch (error) {
      console.error("Failed to delete group", error);
      setMessage("Failed to delete group");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Contact Groups
        </h1>

        <p className="text-gray-600 mt-2">
          Organize contacts into groups
        </p>

      </div>

      {message && (
        <div className="bg-blue-100 text-blue-700 p-4 rounded mb-6">
          {message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Group" : "Create Group"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            placeholder="Group Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border p-3 rounded"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="border p-3 rounded"
            rows={4}
          />

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
            >
              {editingId ? "Update Group" : "Create Group"}
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
                className="border rounded-lg p-4 flex justify-between items-center"
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

                <div className="flex gap-3">

                  <button
                    onClick={() => handleEdit(group)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(group.id)}
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

export default Groups;