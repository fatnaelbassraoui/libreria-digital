
"use client";

interface SearchBarProps {
    value: string;
    setQuery: (value: string) => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({ value, setQuery }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.target.value);
    };
    
    return (
        <form className="max-w-md mx-auto bg-" onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center border pl-4 gap-2 border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md w-full">
                <input
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={handleInputChange}
                    className="w-full h-full outline-none text-gray-500 bg-transparent placeholder-gray-500 text-sm"
                />
            </div>
        </form>
    )
}