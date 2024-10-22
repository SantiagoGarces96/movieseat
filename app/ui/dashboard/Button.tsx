import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "btn btn-secondary btn-sm min-w-28 text-primary",
        className,
      )}
    >
      {children}
    </button>
  );
}
