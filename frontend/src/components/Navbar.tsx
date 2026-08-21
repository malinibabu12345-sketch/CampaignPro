import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">

                <Link to="/" className="text-2xl font-bold">
                  CampaignPro
                </Link>

                <div className="flex flex-wrap gap-4">
                    <Link to="/">Home</Link>

                    <Link to="/dashboard">Dashboard</Link>

                    <Link to="/templates">Templates</Link>

                    <Link to="/contacts">Contacts</Link>

                    <Link to="/groups">Groups</Link>

                    <Link to="/campaigns">Campaigns</Link>

                    <Link to="/analytics">Analytics</Link>

                    <Link to="/admin">Admin</Link>

                    <Link to="/profile">Profile</Link>

                    <Link to="/login">Login</Link>

                    <Link to="/register">Register</Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
