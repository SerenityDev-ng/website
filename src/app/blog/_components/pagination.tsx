"use client";

import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) {
      params.set("page", page.toString());
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show 5 page numbers at a time

    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + showPages - 1);

    // Adjust start if we're near the end
    if (totalPages - currentPage < 2) {
      start = Math.max(1, totalPages - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <nav
      className="flex justify-center items-center gap-2 py-8"
      aria-label="Pagination"
    >
      {/* Previous page button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={clsx(
          "px-3 py-1 rounded-md text-sm font-medium",
          currentPage <= 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-purple-600 hover:bg-purple-50"
        )}
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex gap-1">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              currentPage === page
                ? "bg-purple-600 text-white"
                : "text-gray-700 hover:bg-purple-50"
            )}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next page button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={clsx(
          "px-3 py-1 rounded-md text-sm font-medium",
          currentPage >= totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-purple-600 hover:bg-purple-50"
        )}
      >
        Next
      </button>
    </nav>
  );
}
