"use client";

import React from "react";
import SearchBar from "./SearchBar";
import { useAppLayout } from "./AppLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Header() {
  const layout = useAppLayout();

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-3">
        {layout && (
          <button
            onClick={layout.toggleSidebar}
            className="lg:hidden p-2 -ml-1 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        )}
        <SearchBar />
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button className="p-2  border bg-slate-50 border-gray-200 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0016 2.00098C12.4158 2.00098 12.7516 2.33676 12.7516 2.75098V3.53801C16.5416 3.9143 19.5016 7.11197 19.5016 11.001V14.115L20.1938 15.9609C20.7454 17.4319 19.6581 19.001 18.0871 19.001H15.0628C15.0287 20.6631 13.6701 21.9995 11.9998 21.9995C10.3295 21.9995 8.97089 20.6631 8.93682 19.001H5.9161C4.34514 19.001 3.25776 17.4319 3.80936 15.9609L4.5016 14.115V11.001C4.5016 7.11197 7.46161 3.9143 11.2516 3.53801V2.75098C11.2516 2.33676 11.5874 2.00098 12.0016 2.00098ZM10.4375 19.001C10.471 19.8339 11.1573 20.4995 11.9998 20.4995C12.8423 20.4995 13.5286 19.8339 13.5622 19.001H10.4375ZM6.0016 11.001C6.0016 7.68727 8.68789 5.00098 12.0016 5.00098C15.3153 5.00098 18.0016 7.68727 18.0016 11.001V14.1168C18.0016 14.2955 18.0337 14.4727 18.0965 14.64L18.7893 16.4876C18.9732 16.9779 18.6108 17.501 18.0871 17.501H5.9161C5.39244 17.501 5.02998 16.9779 5.21385 16.4876L5.90673 14.64C5.96946 14.4727 6.0016 14.2955 6.0016 14.1168V11.001Z"
                fill="#343C54"
              />
            </svg>
          </button>

          <button className="p-2 border bg-slate-50 border-gray-200 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0 0 0)"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.9992 8.7743C9.88118 8.7743 8.16419 10.4913 8.16419 12.6093C8.16419 14.7273 9.88118 16.4443 11.9992 16.4443C14.1172 16.4443 15.8342 14.7273 15.8342 12.6093C15.8342 10.4913 14.1172 8.7743 11.9992 8.7743ZM9.66419 12.6093C9.66419 11.3197 10.7096 10.2743 11.9992 10.2743C13.2888 10.2743 14.3342 11.3197 14.3342 12.6093C14.3342 13.8989 13.2888 14.9443 11.9992 14.9443C10.7096 14.9443 9.66419 13.8989 9.66419 12.6093Z"
                fill="#343C54"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.5809 8.9224C1.96404 9.99083 2.33012 11.357 3.39854 11.9739C3.88777 12.2563 3.88776 12.9625 3.39856 13.2449C2.33013 13.8618 1.96407 15.2279 2.58092 16.2964L4.09692 18.9222C4.71391 19.9908 6.08044 20.3568 7.14896 19.7399C7.63844 19.4573 8.25011 19.8106 8.25011 20.3754C8.25011 21.6092 9.2503 22.6094 10.4841 22.6094H13.5165C14.7502 22.6094 15.7501 21.6091 15.7501 20.3756C15.7501 19.8108 16.3615 19.458 16.8503 19.7402C17.9185 20.357 19.2845 19.991 19.9012 18.9227L21.4176 16.2963C22.0344 15.2279 21.6684 13.8617 20.6 13.2449C20.1108 12.9624 20.1108 12.2563 20.6 11.9739C21.6684 11.3571 22.0345 9.99089 21.4176 8.92247L19.9012 6.29604C19.2845 5.2278 17.9185 4.86179 16.8503 5.47854C16.3615 5.76076 15.7501 5.40794 15.7501 4.84314C15.7501 3.60961 14.7502 2.60938 13.5165 2.60938H10.4841C9.2503 2.60938 8.25011 3.60957 8.25011 4.84337C8.25011 5.40822 7.63842 5.76152 7.14894 5.47892C6.08042 4.86201 4.71388 5.22797 4.09689 6.29663L2.5809 8.9224ZM4.14854 10.6748C3.79755 10.4722 3.6773 10.0234 3.87994 9.6724L5.39593 7.04663C5.59863 6.69554 6.04772 6.57518 6.39894 6.77796C7.88811 7.63773 9.75011 6.56327 9.75011 4.84337C9.75011 4.43799 10.0787 4.10937 10.4841 4.10937L13.5165 4.10937C13.9216 4.10937 14.2501 4.43788 14.2501 4.84314C14.2501 6.56227 16.1112 7.63733 17.6003 6.77758C17.9511 6.57504 18.3997 6.69524 18.6022 7.04604L20.1186 9.67247C20.3212 10.0234 20.201 10.4722 19.85 10.6749C18.3608 11.5346 18.3608 13.6841 19.85 14.5439C20.2009 14.7465 20.3212 15.1953 20.1186 15.5463L18.6022 18.1727C18.3996 18.5235 17.9511 18.6437 17.6003 18.4412C16.1112 17.5815 14.2501 18.6565 14.2501 20.3756C14.2501 20.7809 13.9216 21.1094 13.5165 21.1094H10.4841C10.0787 21.1094 9.75011 20.7808 9.75011 20.3754C9.75011 18.6555 7.88812 17.5811 6.39896 18.4408C6.04774 18.6436 5.59866 18.5232 5.39596 18.1722L3.87996 15.5464C3.67732 15.1954 3.79757 14.7466 4.14856 14.5439C5.63778 13.6841 5.63775 11.5346 4.14854 10.6748Z"
                fill="#343C54"
              />
            </svg>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="transition-opacity text-gray-800 hover:text-gray-600"
              >
                Production
                <i className="lni lni-more-vertical text-sm text-red-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 focus:text-red-500">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
