import { Skeleton } from "@/components/ui/skeleton";

export const BlogCardLoader = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <div
          key={item}
          className="bg-white rounded-lg shadow-md overflow-hidden space-y-5"
        >
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="w-2/3" />
          <Skeleton className="w-9 h-8" />
        </div>
      ))}
    </div>
  );
};
