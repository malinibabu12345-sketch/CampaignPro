function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-2">
        Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Welcome to CampaignPro Dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Total Contacts
          </h2>

          <p className="text-3xl font-bold text-blue-600 mt-3">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Total Campaigns
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-3">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Total Templates
          </h2>

          <p className="text-3xl font-bold text-purple-600 mt-3">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Total Groups
          </h2>

          <p className="text-3xl font-bold text-orange-600 mt-3">
            0
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;