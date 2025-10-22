import { Link, useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 text-gray-900">
            <nav className="bg-white shadow-lg py-4 px-6 flex justify-between items-center rounded-b-xl">
                {/* App Branding */}
                <Link
                    to="/dashboard"
                    className="text-2xl font-bold text-indigo-600 hover:text-indigo-400 transition"
                >
                    SmartTask
                </Link>

                {/* Navigation & Logout */}
                <div className="space-x-4 flex items-center">
                    <Link
                        to="/dashboard"
                        className="text-gray-700 font-medium hover:text-indigo-600 transition"
                    >
                        Dashboard
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="p-6 max-w-4xl mx-auto mt-6">{children}</main>
        </div>
    );
}
