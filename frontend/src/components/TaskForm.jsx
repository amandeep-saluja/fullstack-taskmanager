import { useState } from 'react';
import api from '../api/axiosClient';
import toast from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';

export default function TaskForm({ fetchTasks, loading }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const addTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) return toast.error('Title is required');

        try {
            await api.post('/tasks', { title, description });
            setTitle('');
            setDescription('');
            toast.success('Task added successfully');
            fetchTasks();
        } catch {
            toast.error('Error adding task');
        }
    };

    return (
        <form
            onSubmit={addTask}
            className="mb-8 bg-white p-6 rounded-2xl shadow-lg max-w-xl mx-auto transition-transform hover:scale-[1.01]"
        >
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 p-3 w-full mb-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition duration-200"
            />
            <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition duration-200 resize-none"
                rows={3}
            />
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
                    loading
                        ? 'bg-indigo-300 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
                {loading ? (
                    <div className="flex justify-center items-center gap-2">
                        <ClipLoader size={20} color="#fff" />
                        Adding...
                    </div>
                ) : (
                    'Add Task'
                )}
            </button>
        </form>
    );
}
