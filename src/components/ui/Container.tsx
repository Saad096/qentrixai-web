import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-container px-5 sm:px-8 lg:px-9", className)}>
      {children}
    </div>
  );
}
