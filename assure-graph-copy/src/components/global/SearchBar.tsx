import React from "react";

export default function SearchBar() {
  return (
    <div className="relative">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-slate-700 absolute left-3 top-1/2 -translate-y-1/2"
      >
        <path
          d="M8 2L9.5 5.5L13 7L9.5 8.5L8 12L6.5 8.5L3 7L6.5 5.5L8 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 10L13.25 11.75L15 12.5L13.25 13.25L12.5 15L11.75 13.25L10 12.5L11.75 11.75L12.5 10Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <div className="h-5 w-0.5 absolute left-8.5 top-1/2 -translate-y-1/2 bg-gray-300"></div>
      <input
        type="text"
        placeholder="Ask AI what you are thinking..."
        className="w-full min-w-0 max-w-[200px] sm:max-w-[280px] md:w-80 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-4 focus:border-transparent placeholder:text-gray-400"
      />
    </div>
  );
}
