import { FullHeading } from "../components/FullHeading";
import { InputField } from "../components/InputField";
import { PasswordInput } from "../components/PasswordInput";
import { BigHeading } from "../components/bigHeading";
import { SubHeading } from "../components/SubHeading";
import { BottomHeading } from "../components/BottomHeading";
import { Button } from "../components/Button";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface signinInput {
  username: string;
  password: string;
}
export function Signin() {
  const navigate = useNavigate();
  const [signinInput, setSigninInput] = useState<signinInput>({
    username: "",
    password: "",
  });
  const [isEmptyMessageDisplaying, setIsEmptyMessageDisplaying] =
    useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorValue, setErrorValue] = useState<string | null>(null);
  const [isSomethingInvalid, setIsSomethingInvalid] = useState<boolean>(false);
  const [invalidStuff, setInvalidStuff] = useState<string>("");
  const [waiting, setWaiting] = useState<boolean>(false);
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
              const currentInput: string = event.target.value;

              setSigninInput({ ...signinInput, username: currentInput });
            }}
          ></InputField>
          <PasswordInput
            label={"password"}
            onChange={(event) => {
              const currentInput: string = event.target.value;

              setSigninInput({ ...signinInput, password: currentInput });
            }}
          ></PasswordInput>
          <Button
            label={waiting ? <LoadingSpinner /> : "sign in"}
            onClick={async () => {
              if (!signinInput.username || !signinInput.password) {
                setIsEmptyMessageDisplaying(true);
                setTimeout(() => {
                  setIsEmptyMessageDisplaying(false);
                }, 5000);
                return;
              }
              try {
                setWaiting(true);
                const response = await fetch(
                  "http://localhost:4000/api/v1/user/signin",
                  {
                    method: "POST",
                    body: JSON.stringify(signinInput),
                    headers: { "Content-Type": "application/json" },
                  }
                );

                if (!response.ok) {
                  const data = await response.json();
                  setInvalidStuff(data.msg);
                  setIsSomethingInvalid(true);
                  return;
                }

                const recievedData = await response.json();
                const jwt = recievedData.token;
                localStorage.setItem("jwt", jwt);
                navigate("/dashboard");
              } catch (error: unknown) {
                if (error instanceof Error) {
                  if (
                    error.name === "TypeError" &&
                    error.message === "Failed to fetch"
                  ) {
                    setHasError(true);
                    setErrorValue(
                      "The backend server is unreachable. Please try again later."
                    );
                  } else {
                    setHasError(true);
                    setErrorValue(error.message || "An unknown error occurred");
                  }
                } else {
                  setHasError(true);
                  setErrorValue("an unknown error occured");
                }
                // Check if the error is due to network failure or server down
              } finally {
                setWaiting(false);
              }
            }}
          ></Button>

          {isEmptyMessageDisplaying && (
            <p className="text-center">please fill up your credentials</p>
          )}
          {hasError && (
            <p className="text-red">an error occured : {errorValue}</p>
          )}
          {isSomethingInvalid && <p className="text-red">{invalidStuff}</p>}
          <BottomHeading redirectLink={"/signup"} action={"sign up"}>
            don't have an account ? click here to
          </BottomHeading>
          {/* <FadeInComponent></FadeInComponent> */}
        </div>
      </div>
    </>
  );
}
