import { cn } from "@/lib/utils";

export function Container({
  width = "page",
  className,
  children,
}: {
  /** `footer` runs wider than the page. See maxWidth in tailwind.config. */
  width?: "page" | "footer";
  className?: string;
  children: React.ReactNode;
}) {
  // 20px on a phone, 32px from 640 up. There is no third value: lg:px-9 put
  // 36px on desktop, which nothing else on the site matched and which the
  // owner read as the page sitting too far off its own edges.
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        width === "footer" ? "max-w-footer" : "max-w-container",
        className
      )}
    >
      {children}
    </div>
  );
}
