"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove the page parameter
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page"); // Remove page param if it's page 1
    }

    // Preserve other existing parameters (like category)
    const queryString = params.toString();
    const newPath = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(newPath);
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

  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

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
            : "text-primary hover:bg-purple-50"
        )}
        aria-label="Previous page"
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex gap-1">
        {/* First page if not in view */}
        {getPageNumbers()[0] > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-purple-50"
            >
              1
            </button>
            {getPageNumbers()[0] > 2 && (
              <span className="w-8 h-8 flex items-center justify-center text-gray-500">
                ...
              </span>
            )}
          </>
        )}

        {/* Visible page numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              currentPage === page
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-purple-50"
            )}
            aria-current={currentPage === page ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ))}

        {/* Last page if not in view */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
              <span className="w-8 h-8 flex items-center justify-center text-gray-500">
                ...
              </span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-purple-50"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next page button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={clsx(
          "px-3 py-1 rounded-md text-sm font-medium",
          currentPage >= totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-primary hover:bg-purple-50"
        )}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
