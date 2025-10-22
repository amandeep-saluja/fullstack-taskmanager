export default function DeleteModal({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl w-80 max-w-sm text-center transform transition-all duration-200 scale-95 animate-scale-in">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Delete this task?
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                    This action cannot be undone.
                </p>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
