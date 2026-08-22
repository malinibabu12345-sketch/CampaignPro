import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await registerUser({
        name,
        email,
        password
      });
      setMessage("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
  console.error(err);
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Registration failed. Please try again.");
  }
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        {message && (
          <p className="mb-4 text-center text-green-600">
            {message}
          </p>
        )}

        {error && (
          <p className="mb-4 text-center text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister}>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
}
export default Register;