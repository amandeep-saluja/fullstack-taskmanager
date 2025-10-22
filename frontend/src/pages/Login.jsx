import { useState } from 'react';
import api from '../api/axiosClient';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            toast.error('Please enter both username and password.');
            return;
        }

        try {
            setLoading(true);
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (err) {
            console.error('Login failed:', err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                toast.error('Invalid credentials. Please try again.');
            } else {
                toast.error('Something went wrong. Please try later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
            {/* App Title / Brand */}
            <div className="absolute top-6 text-center">
                <h1 className="text-3xl font-extrabold text-indigo-700 tracking-wide">
                    Taskify
                </h1>
                <p className="text-gray-600 text-sm">
                    Your Personal Task Manager
                </p>
            </div>

            {/* Form Card */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mt-10"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login to Your Account
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-3 w-full mb-6 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                        loading
                            ? 'bg-indigo-300 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                >
                    {loading ? (
                        <div className="flex justify-center items-center gap-2">
                            <ClipLoader size={20} color="#fff" />
                            Logging in...
                        </div>
                    ) : (
                        'Login'
                    )}
                </button>

                <p className="text-sm text-center mt-4 text-gray-600">
                    New user?{' '}
                    <Link
                        to="/register"
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>

            <footer className="mt-10 text-gray-500 text-xs text-center">
                © {new Date().getFullYear()} Taskify. All rights reserved.
            </footer>
        </div>
    );
}
