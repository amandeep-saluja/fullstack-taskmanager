import { useState } from 'react';
import api from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Make sure to install react-hot-toast
import ClipLoader from 'react-spinners/ClipLoader'; // For spinner

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login to Your Account
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-3 w-full mb-4 rounded focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-3 w-full mb-5 rounded focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2.5 rounded text-white font-semibold ${
                        loading
                            ? 'bg-gray-400'
                            : 'bg-blue-600 hover:bg-blue-700'
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
                    <a
                        href="/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
}
