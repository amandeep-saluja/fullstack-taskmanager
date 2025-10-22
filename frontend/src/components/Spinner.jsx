import React from 'react';

const Spinner = () => (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
        <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
    </div>
);

export default Spinner;
