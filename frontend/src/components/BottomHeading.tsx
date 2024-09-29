import { ReactNode } from "react";

interface BottomHeadingProps {
  children: ReactNode;
  action: string;
  redirectLink: string;
}
export function BottomHeading({
  children,
  action,
  redirectLink,
}: BottomHeadingProps) {
  return (
    <>
      <div className="text-center">
        <p className="text-sexyPink font-semibold text-md text-opacity-60">
          {children}{" "}
          <a
            href={redirectLink}
            className="underline transition-colors ease-in-out duration-200 hover:text-sexyMaroon cursor-pointer"
          >
            {action}
          </a>
        </p>
      </div>
    </>
  );
}
