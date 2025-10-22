import { useState, useEffect } from 'react';
import api from '../api/axiosClient';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [expandedTask, setExpandedTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState({
        open: false,
        taskId: null,
    });

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!title.trim()) return toast.error('Title is required');
        try {
            setLoading(true);
            await api.post('/tasks', { title, description });
            setTitle('');
            setDescription('');
            toast.success('Task added successfully');
            await fetchTasks();
        } catch (err) {
            toast.error('Error adding task');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (taskId) => {
        setDeleteModal({ open: true, taskId });
    };

    const confirmDelete = async () => {
        const taskId = deleteModal.taskId;
        try {
            setLoading(true);
            await api.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter((t) => t.id !== taskId));
            toast.success('Task deleted');
        } catch (err) {
            toast.error('Failed to delete');
        } finally {
            setLoading(false);
            setDeleteModal({ open: false, taskId: null });
        }
    };

    const cancelDelete = () => {
        setDeleteModal({ open: false, taskId: null });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const toggleExpand = (taskId) => {
        setExpandedTask(expandedTask === taskId ? null : taskId);
    };

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto mt-10 px-4">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    My Tasks
                </h2>

                <form
                    onSubmit={addTask}
                    className="mb-8 bg-white p-5 shadow-md rounded-2xl"
                >
                    <input
                        className="border border-gray-300 p-2 w-full mb-3 rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="border border-gray-300 p-2 w-full mb-3 rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="Task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-white ${
                            loading
                                ? 'bg-gray-400'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Adding...' : 'Add Task'}
                    </button>
                </form>

                {loading && tasks.length === 0 && (
                    <p className="text-center text-gray-500">
                        Loading tasks...
                    </p>
                )}

                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-white p-4 shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition"
                        >
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleExpand(task.id)}
                            >
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {task.title}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500">
                                        {expandedTask === task.id
                                            ? '▲ Hide'
                                            : '▼ View'}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClick(task.id);
                                        }}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {expandedTask === task.id && (
                                <p className="text-gray-600 mt-3 whitespace-pre-line">
                                    {task.description}
                                </p>
                            )}
                        </div>
                    ))}

                    {tasks.length === 0 && !loading && (
                        <p className="text-center text-gray-500">
                            No tasks yet. Add one above!
                        </p>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.open && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-xl p-6 shadow-lg w-80 text-center">
                        <h3 className="text-lg font-semibold mb-4">
                            Delete this task?
                        </h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
