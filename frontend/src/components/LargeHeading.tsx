import { oneLabelProps } from "../components/bigHeading";

export function LargeHeading({ label }: oneLabelProps) {
  return (
    <h1 className="text-sexyMaroon text-7xl font-bold animate-fadeIn text-center rounded-lg bg-white shadow-xl px-12 w-1/3 pb-6 mx-auto ">
      {label}
    </h1>
  );
}
