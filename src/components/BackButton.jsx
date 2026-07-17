import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

function BackButton({ text = "Back to Shop" }) {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:cursor-pointer hover:text-pink-500 font-medium text-sm md:text-md lg:text-lg mb-6 transition-colors duration-200 group"
        >
            <ArrowLeft className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:-translate-x-1" />
            {text}
        </button>
    )
}

export default BackButton