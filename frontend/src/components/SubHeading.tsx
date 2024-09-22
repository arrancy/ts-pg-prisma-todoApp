import { oneLabelProps } from "./bigHeading";

export function SubHeading({ label }: oneLabelProps) {
  return (
    <>
      <p className="text-sexyPink font-semibold text-md text-opacity-60">
        {label}
      </p>
    </>
  );
}
