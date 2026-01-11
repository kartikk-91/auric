import {CircleCheck} from "lucide-react"

interface FormSuccessProps {
    message?: string;
}

export const FormSuccess = ({
    message
}: FormSuccessProps) => {
    if(!message) return;
    return (
        <div className="bg-emerald-500/15 p-3 flex items-center rounded-md gap-x-2 text-sm text-emerald-500">
            {message && <CircleCheck />}{message}
        </div>
    );
}