import { oneLabelProps } from "./bigHeading";

export function InputField({ label }: oneLabelProps) {
  return (
    <>
      <div>
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-sexyMaroon dark:text-white"
        >
          {label}
        </label>
        <input
          type="text"
          id="small-input"
          className="block w-full p-2 text-gray-900 border rounded-lg bg-gray-50 text-xs focus:ring-2 focus:ring-sexyMaroon
           border-sexyPink  focus:border-sexyMaroon outline-none"
        />
      </div>
    </>
  );
}
// focus:ring-2 focus:ring-sexyMaroon
