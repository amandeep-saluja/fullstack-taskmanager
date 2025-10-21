import { useState, useEffect } from 'react'
import api from '../api/axiosClient'
import TaskCard from '../components/TaskCard'

export default function Dashboard() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const fetchTasks = async () => {
        const res = await api.get('/tasks')
        setTasks(res.data)
    }

    const addTask = async (e) => {
        e.preventDefault()
        await api.post('/tasks', { title, description })
        setTitle('')
        setDescription('')
        fetchTasks()
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
            <form onSubmit={addTask} className="mb-6">
                <input
                    className="border p-2 w-full mb-2 rounded"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="border p-2 w-full mb-2 rounded"
                    placeholder="Task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Add Task
                </button>
            </form>

            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}
