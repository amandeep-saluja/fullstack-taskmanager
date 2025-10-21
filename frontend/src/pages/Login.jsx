import { useState } from 'react'
import api from '../api/axiosClient'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await api.post('/auth/login', { username, password })
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white w-full py-2 rounded"
                >
                    Login
                </button>
                <p className="text-sm text-center mt-2">
                    New user?{' '}
                    <a href="/register" className="text-blue-600">
                        Register
                    </a>
                </p>
            </form>
        </div>
    )
}
