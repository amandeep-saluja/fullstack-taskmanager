import { useState } from 'react';

export default function TaskCard({ task, onDelete }) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <div
            className={`bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${
                expanded ? 'bg-indigo-50' : ''
            }`}
        >
            <div
                className="flex justify-between items-center"
                onClick={toggleExpand}
            >
                <h3 className="font-semibold text-lg text-gray-800">
                    {task.title}
                </h3>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 select-none">
                        {expanded ? '▲ Hide' : '▼ View'}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task.id);
                        }}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {expanded && (
                <p className="text-gray-700 mt-3 whitespace-pre-line leading-relaxed">
                    {task.description}
                </p>
            )}
        </div>
    );
}
