import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import DeleteModal from '../components/DeleteModal';
import api from '../api/axiosClient';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
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

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDeleteClick = (taskId) =>
        setDeleteModal({ open: true, taskId });

    const cancelDelete = () => setDeleteModal({ open: false, taskId: null });

    const confirmDelete = async () => {
        try {
            setLoading(true);
            await api.delete(`/tasks/${deleteModal.taskId}`);
            setTasks(tasks.filter((t) => t.id !== deleteModal.taskId));
            toast.success('Task deleted');
        } catch {
            toast.error('Failed to delete');
        } finally {
            setLoading(false);
            cancelDelete();
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10 px-4">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
                    My Tasks
                </h2>

                <TaskForm fetchTasks={fetchTasks} loading={loading} />

                <TaskList
                    tasks={tasks}
                    loading={loading}
                    onDelete={handleDeleteClick}
                />

                {deleteModal.open && (
                    <DeleteModal
                        onConfirm={confirmDelete}
                        onCancel={cancelDelete}
                    />
                )}
            </div>
        </>
    );
}
