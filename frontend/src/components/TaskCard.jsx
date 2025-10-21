import api from '../api/axiosClient'

export default function TaskCard({ task }) {
    const deleteTask = async () => {
        await api.delete(`/tasks/${task.id}`)
        window.location.reload()
    }

    return (
        <div className="border rounded p-3 mb-3 flex justify-between">
            <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <button onClick={deleteTask} className="text-red-500">
                ✕
            </button>
        </div>
    )
}
