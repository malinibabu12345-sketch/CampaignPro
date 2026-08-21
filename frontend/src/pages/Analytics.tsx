function Analytics() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Campaign Analytics
        </h1>

        <p className="text-gray-600 mt-2">
          Monitor the performance of your email campaigns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Emails Sent
          </h2>

          <p className="text-3xl font-bold text-blue-600 mt-3">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Delivered
          </h2>

          <p className="text-3xl font-bold text-green-600 mt-3">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Opened
          </h2>

          <p className="text-3xl font-bold text-purple-600 mt-3">
            0
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Clicked
          </h2>

          <p className="text-3xl font-bold text-orange-600 mt-3">
            0
          </p>
        </div>

      </div>
    </div>
  );
}

export default Analytics;