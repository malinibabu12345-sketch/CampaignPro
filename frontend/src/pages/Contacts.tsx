function Contacts() {
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

        <button className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700">
          + Add Contact
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          My Contact List
        </h2>

        <p className="text-gray-500">
          No contacts available.
        </p>
      </div>
    </div>
  );
}

export default Contacts;