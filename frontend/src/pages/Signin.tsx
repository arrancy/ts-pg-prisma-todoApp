import { BigHeading } from "../components/bigHeading";
import { InputField } from "../components/InputField";

export function Signin() {
  return (
    <>
      <div className="flex items-center justify-center h-screen mx-auto">
        <div className="shadow-md rounded-md px-8 py-10">
          <BigHeading label={"Signin"}></BigHeading>
          <InputField label={"username"}></InputField>
        </div>
      </div>
    </>
  );
}
