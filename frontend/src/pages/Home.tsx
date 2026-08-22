import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex flex-col items-center pt-20">

        <h1 className="text-5xl font-bold text-gray-800">
          Welcome to CampaignPro
        </h1>

        <p className="text-xl text-gray-600 mt-10">
          Email Campaign Manager System
        </p>

        <div className="flex gap-6 mt-12">

          <Link
            to="/login"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700"
          >
            Register
          </Link>

        </div>

      </div>

      <div className="flex flex-col items-center mt-20 px-8">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Everything You Need to Manage Campaigns
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">
              Create Campaigns
            </h3>

            <p className="text-gray-600">
              Create, manage and send email campaigns to contacts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">
              Manage Contacts
            </h3>

            <p className="text-gray-600">
              Add and organize contacts and groups for campaigns.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3">
              Track Analytics
            </h3>

            <p className="text-gray-600">
              Monitor email delivery, opens and click performance.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
export default Home;