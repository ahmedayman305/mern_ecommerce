function Input({ icon: Icon, ...props }) {
    return (
        <div className="relative mb-6 select-none">
            <div className="absolute inset-y-0 flex left-0 items-center pl-3 pointer-events-none">
                {Icon}
            </div>
            <input
                {...props}
                className="w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-lg 
                border border-slate-800 focus:border-0 focus:ring-0 
                text-slate-800 placeholder-gray-400 transition duration-200"
            />
        </div>
    );
}

export default Input;
