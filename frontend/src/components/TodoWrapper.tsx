export interface WrapperProps {
  children: React.ReactNode;
}

export function TodoWrapper({ children }: WrapperProps) {
  return (
    <>
      <div className="bg-white py-6 px-6 w-3/5 mx-auto mt-8 rounded-lg shadow-xl brightness-100 ">
        {children}
      </div>
    </>
  );
}
