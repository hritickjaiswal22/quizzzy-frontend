import { Skeleton } from "@/features/ui/skeleton";

function PageFallback() {
  return (
    <section className="h-[calc(100vh-4rem)] gap-8 flex flex-col justify-evenly">
      <div className="w-[80%] mx-auto my-8">
        <Skeleton className="h-6 my-4 w-full" />
        <Skeleton className="h-6 my-4 w-full" />
        <Skeleton className="h-6 my-4 w-full" />
        <Skeleton className="h-6 my-4 w-full" />
        <Skeleton className="h-6 my-4 w-full" />
        <Skeleton className="h-6 my-4 w-full" />
      </div>

      <div className="w-[80%] mx-auto my-8">
        <Skeleton className="h-6 my-4 w-full" />
        <Skeleton className="h-6 my-4 w-full" />
        <Skeleton className="h-6 my-4 w-full" />
        <Skeleton className="h-6 my-4 w-full" />
        <Skeleton className="h-6 my-4 w-full" />
        <Skeleton className="h-6 my-4 w-full" />
      </div>
    </section>
  );
}

export default PageFallback;
