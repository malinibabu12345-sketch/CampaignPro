import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import Contacts from "./pages/Contacts";
import Groups from "./pages/Groups";
import Campaigns from "./pages/Campaigns";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Tracking from "./pages/Tracking";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/templates" element={<Templates />} />

        <Route path="/contacts" element={<Contacts />} />

        <Route path="/groups" element={<Groups />} />

        <Route path="/campaigns" element={<Campaigns />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/tracking" element={<Tracking />} />
      </Routes>

    </BrowserRouter>
  );
}
export default App;