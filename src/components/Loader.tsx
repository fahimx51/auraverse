import React from 'react';

function Loader() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-100 border-t-pink-500"></div>
            <p className="mt-3 text-xs font-semibold text-gray-400 tracking-wider animate-pulse">
                Loading...
            </p>
        </div>
    );
}

export default Loader;