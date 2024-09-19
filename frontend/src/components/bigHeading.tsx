export interface oneLabelProps {
  label: string;
}

export function BigHeading({ label }: oneLabelProps) {
  return (
    <>
      <h3 className="text-4xl font-bold text-sexyMaroon">{label}</h3>
    </>
  );
}
