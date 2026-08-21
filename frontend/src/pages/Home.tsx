import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-800">
          Welcome to CampaignPro
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-gray-600">
          Email Campaign Manager System
        </p>

        <div className="flex gap-4">
          <Link to="/login"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </Link>

          <Link to="/register"
            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Register
          </Link>
        </div>
     
      </section>
    </div>
  );
}

export default Home;