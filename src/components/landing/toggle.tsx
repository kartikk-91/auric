"use client";
interface ToggleProps {
    checked: boolean;
    setChecked: (arg0: boolean) => void;
}
const Toggle: React.FC<ToggleProps> = ({ checked, setChecked }) => {
    return (
        <label className="relative inline-block text-[10px]">
            <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="peer absolute opacity-0 w-0 h-0 cursor-pointer"
            />
            <div
                className={`relative h-[3em] w-[5.5em] rounded-[10em] transition-colors duration-300 ${checked ? "bg-gray-800" : "bg-white"
                    }`}
            >
                <div
                    className={`absolute h-[2.5em] w-[2.5em] rounded-full transition-all duration-500 ease-[cubic-bezier(.26,2,.46,.71)] ${checked
                            ? "translate-x-[2.7em] translate-y-[0.25em] bg-[#485367] shadow-[inset_0px_0px_0px_0.75em_white]"
                            : "translate-x-[0.3em] translate-y-[0.25em] bg-[#ffeccf] shadow-[inset_0px_0px_0px_0.75em_#ffbb52]"
                        }`}
                ></div>
            </div>
        </label>
    );
};

export default Toggle;
