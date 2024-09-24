import { FullHeading } from "../components/FullHeading";
import { InputField } from "../components/InputField";
import { PasswordInput } from "../components/PasswordInput";

export function Signin() {
  return (
    <>
      <div className="flex items-center justify-center h-screen mx-auto">
        <div className="shadow-md rounded-md px-8 py-10 w-80">
          <FullHeading></FullHeading>
          <InputField label={"username"}></InputField>
          <PasswordInput label={"password"}></PasswordInput>
          {/* <FadeInComponent></FadeInComponent> */}
        </div>
      </div>
    </>
  );
}
