import { FullHeading } from "../components/FullHeading";
import { InputField } from "../components/InputField";
import { PasswordInput } from "../components/PasswordInput";
import { BigHeading } from "../components/bigHeading";
import { SubHeading } from "../components/SubHeading";
import { BottomHeading } from "../components/BottomHeading";
import { Button } from "../components/Button";
import { useState } from "react";
export function Signup() {
  const [signupInput, setsignupInput] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  return (
    <>
      <div className="flex items-center justify-center h-screen mx-auto">
        <div className="shadow-md rounded-md px-8 py-6 w-80">
          <FullHeading>
            <BigHeading label={"Signup"}></BigHeading>
            <SubHeading label={"to create an account"}></SubHeading>
          </FullHeading>
          <InputField
            label={"first name"}
            onChange={(event) => {
              setsignupInput({ ...signupInput, firstName: event.target.value });
            }}
          ></InputField>
          <InputField
            label={"last name"}
            onChange={(event) => {
              setsignupInput({ ...signupInput, lastName: event.target.value });
            }}
          ></InputField>
          <InputField
            label={"username"}
            onChange={(event) => {
              setsignupInput({ ...signupInput, username: event.target.value });
            }}
          ></InputField>
          <PasswordInput
            label={"password"}
            onChange={(event) => {
              setsignupInput({ ...signupInput, password: event.target.value });
            }}
          ></PasswordInput>
          <Button
            label={"sign up"}
            onClick={async () => {
              try {
                const response = await fetch(
                  "http://localhost:4000/api/v1/user/signup",
                  {
                    method: "POST",
                    body: JSON.stringify(signupInput),
                  }
                );
                const data = await response.json();
                localStorage.setItem("jwtToken", data.token);
              } catch (error) {
                console.log(error);
              }
            }}
          ></Button>
          <BottomHeading action={"sign in"} redirectLink="/signin">
            already have an account ? click here to
          </BottomHeading>
          {/* <FadeInComponent></FadeInComponent> */}
        </div>
      </div>
    </>
  );
}
