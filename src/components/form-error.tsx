import {TriangleAlert} from "lucide-react"

interface FormErrorProps {
    message?: string;
}

export const FormError = ({
    message
}: FormErrorProps) => {
    if(!message) return;
    return (
        <div className="bg-destructive/15 p-3 flex items-center rounded-md gap-x-2 text-sm text-destructive">
            {message && <TriangleAlert />}{message}
        </div>
    );
}