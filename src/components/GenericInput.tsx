import { iInputProps } from "@/interfaces/types";

export const GenericInput: React.FC<iInputProps> = ({ label, type, name, value, onChange, placeholder, className, checked }) => {
    return (
        <div className="flex items-center gap-16">
            <label className="w-[200px]" htmlFor="">{label}</label>
            <input
                type={type}
                name={name}
                value={type === 'checkbox' ? undefined : value}
                checked={type === 'checkbox' ? checked : undefined} 
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full p-1.5 rounded-md outline-none ${className}`}
            />
        </div>
    );
}