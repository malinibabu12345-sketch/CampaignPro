function Admin() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Manage users, campaigns and monitor activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Total Users
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
            Emails Delivered
          </h2>

          <p className="text-3xl font-bold text-purple-600 mt-3">
            0
          </p>
        </div>

      </div>

      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">
          Administrator Controls
        </h2>

        <p className="text-gray-500">
          User management and system activity will be connected here.
        </p>
      </div>
    </div>
  );
}

export default Admin;