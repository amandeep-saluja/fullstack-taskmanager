import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="bg-indigo-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                {/* App Branding */}
                <div
                    className="text-2xl font-extrabold cursor-pointer hover:text-indigo-200 transition"
                    onClick={() => navigate('/dashboard')}
                >
                    Taskify
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
