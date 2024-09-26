import { ReactNode } from "react";

interface BottomHeadingProps {
  children: ReactNode;
  action: string;
}
export function BottomHeading({ children, action }: BottomHeadingProps) {
  return (
    <>
      <div className="text-center">
        <p className="text-sexyPink font-semibold text-md text-opacity-60">
          {children}{" "}
          <span className="underline transition-colors ease-in-out duration-200 hover:text-sexyMaroon cursor-pointer">
            {action}
          </span>
        </p>
      </div>
    </>
  );
}
