import { FullHeading } from "../components/FullHeading";
import { InputField } from "../components/InputField";
import { PasswordInput } from "../components/PasswordInput";
import { BigHeading } from "../components/bigHeading";
import { SubHeading } from "../components/SubHeading";
import { BottomHeading } from "../components/BottomHeading";
import { Button } from "../components/Button";
import { useState } from "react";
export function Signin() {
  const [signinInput, setSigninInput] = useState({
    username: "",
    password: "",
  });
  return (
    <>
      <div className="flex items-center justify-center h-screen mx-auto">
        <div className="shadow-md rounded-md px-8 py-10 w-80">
          <FullHeading>
            <BigHeading label={"Signin"}></BigHeading>
            <SubHeading label={"into your account"}></SubHeading>
          </FullHeading>
          <InputField
            label={"username"}
            onChange={(event) => {
              setSigninInput({ ...signinInput, username: event.target.value });
            }}
          ></InputField>
          <PasswordInput
            label={"password"}
            onChange={(event) => {
              setSigninInput({ ...signinInput, password: event.target.value });
            }}
          ></PasswordInput>
          <Button
            label={"sign in"}
            onClick={() => {
              return;
            }}
          ></Button>
          <BottomHeading redirectLink={"/signup"} action={"sign up"}>
            don't have an account ? click here to
          </BottomHeading>
          {/* <FadeInComponent></FadeInComponent> */}
        </div>
      </div>
    </>
  );
}
