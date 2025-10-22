import { Link, useNavigate } from 'react-router-dom'

export default function Layout({ children }) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <Link
                    to="/dashboard"
                    className="text-xl font-semibold text-blue-600"
                >
                    SmartTask
                </Link>
                <div className="space-x-4">
                    <Link
                        to="/dashboard"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Dashboard
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="p-6 max-w-4xl mx-auto">{children}</main>
        </div>
    )
}
