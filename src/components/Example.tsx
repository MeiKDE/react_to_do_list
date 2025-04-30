import { cn } from "../lib/utils";

export function Example({ className }: { className?: string }) {
  return (
    <div className={cn("p-4 bg-white rounded-lg shadow", className)}>
      Hello World
    </div>
  );
}
