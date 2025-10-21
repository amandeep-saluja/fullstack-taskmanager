import { useState } from 'react'
import api from '../api/axiosClient'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await api.post('/auth/register', { username, password })
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
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
                    Register
                </button>
                <p className="text-sm text-center mt-2">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600">
                        Login
                    </a>
                </p>
            </form>
        </div>
    )
}
