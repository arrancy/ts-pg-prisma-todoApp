import { ReactNode } from "react";

export interface wrapperProps {
  children: ReactNode;
}

export function FullHeading({ children }: wrapperProps) {
  return (
    <>
      <div className="text-center pb-4">{children}</div>
    </>
  );
}
