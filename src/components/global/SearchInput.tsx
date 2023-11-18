import React from "react";

interface Props {
  className?: string;
  padding?: string;
  placeholder?: string;
  placeholderClassName?: string;
}

function SearchInput({
  className,
  padding = "p-2",
  placeholder = "Search...",
  placeholderClassName,
}: Props) {
  return (
    <>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className={`block w-full  ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${className} ${padding}`}
          placeholder={placeholder}
          required
        />
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
      <label
        htmlFor="default-search"
        className={`mb-2 text-sm font-medium text-gray-900 sr-only ${placeholderClassName}`}
      >
        Search
      </label>
    </>
  );
}

export default SearchInput;
