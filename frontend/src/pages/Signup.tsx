import { FullHeading } from "../components/FullHeading";
import { InputField } from "../components/InputField";
import { PasswordInput } from "../components/PasswordInput";
import { BigHeading } from "../components/bigHeading";
import { SubHeading } from "../components/SubHeading";
import { BottomHeading } from "../components/BottomHeading";
import { Button } from "../components/Button";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export function Signup() {
  const navigate = useNavigate();
  useEffect(() => {
    amIAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function amIAuthenticated() {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        return;
      }
      const response = await fetch("http://localhost:4000/me", {
        headers: {
          "Authorization": "Bearer " + token,
        },
      });
      const data = await response.json();
      if (data.isLoggedIn) {
        navigate("/dashboard");
        return;
      } else {
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
          setIfError(true);
          return;
        } else {
          return;
        }
      } else {
        return;
      }
    }
  }
  const [signupInput, setsignupInput] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [ifError, setIfError] = useState<boolean>(false);

  const [invalidMessage, setInvalidMessage] = useState<string>("");

  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

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
            value={signupInput.firstName}
            onChange={(event) => {
              setsignupInput({ ...signupInput, firstName: event.target.value });
            }}
          ></InputField>
          <InputField
            label={"last name"}
            value={signupInput.lastName}
            onChange={(event) => {
              setsignupInput({ ...signupInput, lastName: event.target.value });
            }}
          ></InputField>
          <InputField
            label={"username"}
            value={signupInput.username}
            onChange={(event) => {
              setsignupInput({ ...signupInput, username: event.target.value });
            }}
          ></InputField>
          <PasswordInput
            label={"password"}
            value={signupInput.password}
            onChange={(event) => {
              setsignupInput({ ...signupInput, password: event.target.value });
            }}
          ></PasswordInput>
          {isEmpty && <p>all fields are compulsory</p>}
          {invalidMessage && <p>{invalidMessage}</p>}
          <Button
            label={isWaiting ? <LoadingSpinner /> : "sign up"}
            onClick={async () => {
              const { username, password, firstName, lastName } = signupInput;
              if (!(username && password && firstName && lastName)) {
                setIsEmpty(true);
                setTimeout(() => {
                  setIsEmpty(false);
                }, 5000);
                return;
              }
              setIsWaiting(true);
              try {
                const response = await fetch(
                  "http://localhost:4000/api/v1/user/signup",
                  {
                    method: "POST",
                    body: JSON.stringify(signupInput),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                if (!response.ok) {
                  const data = await response.json();
                  setInvalidMessage(data.msg);
                  return;
                }
                const recievedData = await response.json();
                localStorage.setItem("jwtToken", recievedData.token);
                navigate("/dashboard");
              } catch (error: unknown) {
                if (error instanceof Error) {
                  if (
                    error.name === "TypeError" &&
                    error.message === "Failed to fetch"
                  ) {
                    setIfError(true);
                    setInvalidMessage("server is down hence unreachable");
                  } else {
                    setIfError(true);
                    setInvalidMessage(error.message);
                  }
                } else {
                  setIfError(true);
                  setInvalidMessage("an error occured");
                }
              } finally {
                setIsWaiting(false);
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
