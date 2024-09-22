import { BigHeading } from "../components/bigHeading";
import { InputField } from "../components/InputField";
import { SubHeading } from "../components/SubHeading";

export function Signin() {
  return (
    <>
      <div className="flex items-center justify-center h-screen mx-auto">
        <div className="shadow-md rounded-md px-8 py-10">
          <BigHeading label={"Signin"}></BigHeading>
          <SubHeading label={"into your account"}></SubHeading>
          <InputField label={"username"}></InputField>
        </div>
      </div>
    </>
  );
}
