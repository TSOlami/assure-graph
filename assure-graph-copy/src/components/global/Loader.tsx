import type { HTMLAttributes } from "react";

type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

export function Loader({
  label = "please wait...",
  className = "",
  ...props
}: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      {...props}
    >
      <div
        className="h-12 w-12 rounded-full animate-spin"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, rgba(240, 90, 53, 0) 0deg, #F05A35 360deg)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 6px))",
          mask:
            "radial-gradient(farthest-side, transparent calc(100% - 7px), #000 calc(100% - 6px))",
        }}
        aria-hidden="true"
      />
      <span className="text-[12px] font-light italic text-neutral-500">
        {label}
      </span>
    </div>
  );
}

