type ButtonProps = {
  label: string | JSX.Element;
  onClick: () => void;
};
export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      className="text-sexyCream bg-sexyMaroon w-full rounded-lg py-2 px-4 hover:opacity-80 mt-0 mb-2 ring-sexyPink focus:ring-2 transition-opacity ease-in-out duration-200"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
