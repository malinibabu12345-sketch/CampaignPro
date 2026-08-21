import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile
} from "../services/userService";

import type { User } from "../types/user";

function Profile() {

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const data = await getProfile();

      setUser(data);
      setName(data.name);

    } catch (err) {

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load profile");
      }

    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setMessage("");
    setError("");

    try {

      const updatedUser = await updateProfile({
        name
      });

      setUser(updatedUser);

      setMessage("Profile updated successfully!");

    } catch (err) {

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update profile");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          My Profile
        </h1>

        <p className="text-gray-600 mb-8">
          View and update your profile
        </p>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">

          <form onSubmit={handleUpdate}>

            <div className="mb-5">

              <label className="block font-medium mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full border border-gray-300 p-3 rounded"
                required
              />

            </div>

            <div className="mb-5">

              <label className="block font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full border border-gray-300 p-3 rounded bg-gray-100"
              />

            </div>

            <div className="mb-6">

              <label className="block font-medium mb-2">
                Role
              </label>

              <input
                type="text"
                value={user?.role || ""}
                disabled
                className="w-full border border-gray-300 p-3 rounded bg-gray-100"
              />

            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Update Profile
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Profile;