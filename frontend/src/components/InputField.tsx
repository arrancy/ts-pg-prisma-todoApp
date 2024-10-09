export interface inputFieldProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function InputField({ label, onChange }: inputFieldProps) {
  return (
    <>
      <div className="my-2">
        <label
          htmlFor="small-input"
          className="block mb-2 text-sm font-medium text-sexyMaroon"
        >
          {label}
        </label>
        <input
          type="text"
          id="small-input"
          className="block w-full p-2 text-gray-900 border rounded-lg bg-gray-50 text-xs focus:ring-2 focus:ring-sexyMaroon
           border-sexyPink  focus:border-sexyMaroon outline-none"
          onChange={onChange}
        />
      </div>
    </>
  );
}
// focus:ring-2 focus:ring-sexyMaroon
