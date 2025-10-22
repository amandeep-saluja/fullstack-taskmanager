import { useState } from 'react';

export default function TaskList({ tasks, loading, onDelete }) {
    const [expandedTask, setExpandedTask] = useState(null);

    const toggleExpand = (taskId) =>
        setExpandedTask(expandedTask === taskId ? null : taskId);

    if (loading && tasks.length === 0)
        return (
            <p className="text-center text-gray-500 mt-6">Loading tasks...</p>
        );

    return (
        <div className="space-y-4 max-w-xl mx-auto">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="bg-white p-4 shadow-sm rounded-xl border border-gray-100 hover:shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer"
                    onClick={() => toggleExpand(task.id)}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg text-gray-800">
                            {task.title}
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 transition-colors duration-200">
                                {expandedTask === task.id ? '▲ Hide' : '▼ View'}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(task.id);
                                }}
                                className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    {expandedTask === task.id && (
                        <p className="text-gray-600 mt-3 whitespace-pre-line transition-all duration-200">
                            {task.description}
                        </p>
                    )}
                </div>
            ))}

            {tasks.length === 0 && !loading && (
                <p className="text-center text-gray-500 mt-4">
                    No tasks yet. Add one above!
                </p>
            )}
        </div>
    );
}
