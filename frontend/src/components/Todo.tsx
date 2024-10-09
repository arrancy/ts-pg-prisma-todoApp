import { Button } from "./Button";
import { useState, useCallback } from "react";
export interface TodoProp {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export function Todo({ title, description, id, done }: TodoProp) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorValue, setErrorValue] = useState<string | null>(null);
  const [isInvalidOrNonExistent, setIsInvalidOrNonExistent] =
    useState<boolean>(false);
  const [invalidMessage, setInvalidMessage] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(done);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);

  const handleRequestError = useCallback((errorMessage: string) => {
    setErrorValue(errorMessage);
    setHasError(true);
    setIsDone(false);
    setTimeout(() => {
      setErrorValue("");
    }, 3000);
  }, []);
  const markTodoDone = useCallback(async () => {
    setIsDone(true);
    const jwt = localStorage.getItem("jwt");
    try {
      const response = await fetch("http://localhost:4000/api/v1/user/todo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + jwt,
        },
        body: JSON.stringify({
          id: id,
          title: title,
          description: description,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        setIsInvalidOrNonExistent(true);
        setInvalidMessage(data.msg);
        setIsDone(false);
      }

      const data = await response.json();
      setDoneMessage(data.msg);
      setTimeout(() => {
        setDoneMessage("");
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
          setHasError(true);
          setErrorValue(
            "The backend server is unreachable. Please try again later."
          );
          handleRequestError("backend server down");
        } else {
          handleRequestError(error.message || "an unknown error occured");
        }
      } else {
        handleRequestError("an unknown error occured");
      }
      // Check if the error is due to network failure or server down
    }
  }, []);

  if (!isDone) {
    return (
      <>
        <div className=" flex gap-6 rounded-xl border-4 border-sexyMaroon px-6 pb-4 pt-2 mx-8 transition-all ease-in-out duration-300 my-4 hover:scale-105">
          <div className="basis-full ">
            <div className="text-2xl text-sexyMaroon font-bold">{title}</div>
            <div className="text-l text-sexyPink font-semibold text-opacity-75">
              {description}
            </div>
            {hasError ? (
              <p>{errorValue}</p>
            ) : isInvalidOrNonExistent ? (
              <p>{invalidMessage}</p>
            ) : null}
          </div>
          <div className="mt-6">
            <Button
              onClick={() => {
                setIsUpdating(!isUpdating);
              }}
              label={isUpdating ? "cancel" : "edit todo"}
            ></Button>
            <Button
              label={isUpdating ? "confirm" : "mark as done"}
              onClick={
                isUpdating
                  ? () => {
                      return;
                    }
                  : markTodoDone
              }
            ></Button>
          </div>
        </div>
      </>
    );
  } else if (doneMessage) {
    return (
      <div className="text-2xl text-sexyMaroon font-bold">{doneMessage}</div>
    );
  } else {
    return null;
  }
}
