import { FullHeading } from "../components/FullHeading";
import { InputField } from "../components/InputField";
import { PasswordInput } from "../components/PasswordInput";
import { BigHeading } from "../components/bigHeading";
import { SubHeading } from "../components/SubHeading";
import { BottomHeading } from "../components/BottomHeading";
import { Button } from "../components/Button";
import { useState } from "react";
import { redirect } from "react-router-dom";
export function Signup() {
  const [signupInput, setsignupInput] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [ifError, setIfError] = useState<Boolean>(false);

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
                if (!response.ok) {
                }
                localStorage.setItem("jwtToken", data.token);
                redirect("/dashboard");
              } catch (error) {
                console.log(error);
                setIfError(true);
              }
            }}
          ></Button>

          {ifError && <p className="text-red"> error signing in </p>}
          <BottomHeading action={"sign in"} redirectLink="/signin">
            already have an account ? click here to
          </BottomHeading>
          {/* <FadeInComponent></FadeInComponent> */}
        </div>
      </div>
    </>
  );
}
