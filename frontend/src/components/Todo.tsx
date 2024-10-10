import { Button } from "./Button";
import { useState, useCallback } from "react";
import { InputField } from "./InputField";
export interface TodoProp {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export function Todo({ title, description, id, done }: TodoProp) {
  const [initialTodoTitle, setInitialTodoTitle] = useState<string>(title);
  const [initialTodoDescription, setInitialTodoDescription] =
    useState<string>(description);
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState<string>(title);
  const [updatedTodoDescription, setUpdatedTodoDescription] =
    useState<string>(description);
  const [backupTitle, setBackupTitle] = useState<string>("");
  const [backupDescription, setBackupDescription] = useState<string>("");
  const [todoId, setTodoId] = useState<number>(id);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorValue, setErrorValue] = useState<string | null>(null);
  const [isInvalidOrNonExistent, setIsInvalidOrNonExistent] =
    useState<boolean>(false);
  const [invalidMessage, setInvalidMessage] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(done);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);
  const [updatedMessage, setUpdatedMessage] = useState<string>("");

  const updateTodo = useCallback(async () => {
    if (
      !(
        initialTodoDescription === updatedTodoDescription &&
        initialTodoTitle === updatedTodoTitle
      )
    ) {
      setBackupTitle(initialTodoTitle);
      setBackupDescription(initialTodoDescription);
      setInitialTodoTitle(updatedTodoTitle);
      setInitialTodoDescription(updatedTodoDescription);
      setIsUpdating(!isUpdating);
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await fetch("http://localhost:4000/api/v1/user/todo", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt,
          },
          body: JSON.stringify({
            id: id,
            title: updatedTodoTitle,
            description: updatedTodoDescription,
          }),
        });
        if (!response.ok) {
          const data = await response.json();
          setIsInvalidOrNonExistent(true);
          setInvalidMessage("could not update todo : " + data.msg);
          setInitialTodoTitle(backupTitle);
          setInitialTodoDescription(backupDescription);
          return;
        }
        const data = await response.json();
        setUpdatedMessage(data.msg);
        setBackupTitle(initialTodoTitle);
        setBackupDescription(initialTodoDescription);
        setTimeout(() => {
          setUpdatedMessage("");
        }, 3000);
      } catch (error: unknown) {
        handleCatch(error, handleRequestErrorForUpdate);
      }
    }
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
      handleCatch(error, handleRequestErrorForDone);
    }
  }, []);

  const handleRequestErrorForDone = useCallback((errorMessage: string) => {
    setErrorValue(errorMessage);
    setHasError(true);
    setIsDone(false);
    setTimeout(() => {
      setErrorValue("");
    }, 3000);
  }, []);
  const handleRequestErrorForUpdate = useCallback((errorMessage: string) => {
    setErrorValue(errorMessage);
    setHasError(true);
    setInitialTodoTitle(backupTitle);
    setInitialTodoDescription(backupDescription);
    setTimeout(() => {
      setErrorValue("");
    }, 3000);
  }, []);
  const handleCatch = useCallback(
    (error: unknown, errorHandler: (errorMessage: string) => void) => {
      if (error instanceof Error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
          setHasError(true);
          setErrorValue(
            "The backend server is unreachable. Please try again later."
          );
          errorHandler("backend server down");
        } else {
          errorHandler(error.message || "an unknown error occured");
        }
      } else {
        errorHandler("an unknown error occured");
      }
    },
    []
  );

  if (!isDone) {
    return (
      <>
        <div className=" animate-fadeIn flex gap-6 rounded-xl border-4 border-sexyMaroon px-6 pb-4 pt-2 mx-8 transition-all ease-in-out duration-300 my-4 hover:scale-105">
          <div className="basis-full ">
            {isUpdating ? (
              <>
                <InputField
                  label="title"
                  value={updatedTodoTitle}
                  onChange={(event) => {
                    setUpdatedTodoTitle(event.target.value);
                  }}
                ></InputField>
                <InputField
                  label="description"
                  value={updatedTodoDescription}
                  onChange={(event) => {
                    setUpdatedTodoDescription(event.target.value);
                  }}
                ></InputField>
              </>
            ) : (
              <>
                <div className="text-2xl text-sexyMaroon font-bold">
                  {initialTodoTitle}
                </div>
                <div className="text-l text-sexyPink font-semibold text-opacity-75">
                  {initialTodoDescription}
                </div>
                {updatedMessage && <p>{updatedMessage}</p>}
              </>
            )}

            {hasError ? (
              <p>{errorValue}</p>
            ) : isInvalidOrNonExistent ? (
              <p>{invalidMessage}</p>
            ) : null}
          </div>
          <div
            className={
              isUpdating
                ? "mt-12 transition-all duration-200 ease-in-out"
                : "mt-6 transition-all duration-200 ease-in-out"
            }
          >
            <Button
              onClick={() => {
                setIsUpdating(!isUpdating);
              }}
              label={isUpdating ? "cancel" : "edit todo"}
            ></Button>
            <Button
              label={isUpdating ? "confirm" : "mark as done"}
              onClick={isUpdating ? updateTodo : markTodoDone}
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
