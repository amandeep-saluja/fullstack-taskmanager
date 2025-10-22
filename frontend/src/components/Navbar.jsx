import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h1
                className="font-bold text-lg cursor-pointer"
                onClick={() => navigate('/dashboard')}
            >
                SmartTask
            </h1>
            <button
                onClick={logout}
                className="bg-white text-blue-600 px-3 py-1 rounded-md font-semibold hover:bg-blue-100"
            >
                Logout
            </button>
        </nav>
    );
}
