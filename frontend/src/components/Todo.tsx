import { Button } from "./Button";
import { useState, useCallback, useEffect } from "react";
import { InputField } from "./InputField";
import { DeleteButton } from "./DeleteButton";
export interface TodoProp {
  id: null | number;
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
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorValue, setErrorValue] = useState<string | null>(null);
  const [isInvalidOrNonExistent, setIsInvalidOrNonExistent] =
    useState<boolean>(false);
  const [invalidMessage, setInvalidMessage] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(done);
  const [doneMessage, setDoneMessage] = useState<string | null>(null);
  const [updatedMessage, setUpdatedMessage] = useState<string>("");
  useEffect(() => {
    setBackupTitle(title);
    setBackupDescription(description);
  }, [title, description]);

  const handleRequestErrorForDone = useCallback((errorMessage: string) => {
    setErrorValue(errorMessage || "an unknown error occured");
    setHasError(true);
    setIsDone(false);
    setTimeout(() => {
      setErrorValue("");
    }, 3000);
  }, []);
  const handleRequestErrorForUpdate = useCallback(
    (errorMessage: string) => {
      setErrorValue(errorMessage || "an unknown error occured");
      setHasError(true);
      setInitialTodoTitle(backupTitle);
      setInitialTodoDescription(backupDescription);

      setTimeout(() => {
        setErrorValue("");
      }, 3000);
    },
    [backupTitle, backupDescription]
  );
  const handleRequestErrorForDelete = useCallback((errorMessage: string) => {
    setErrorValue(errorMessage || "an unknown error occured");
    setHasError(true);
    setIsDone(false);
    setTimeout(() => {
      setErrorValue("");
    }, 3000);
  }, []);
  const handleCatch = useCallback(
    (error: unknown, errorHandler: (errorMessage: string) => void) => {
      if (error instanceof Error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
          errorHandler(
            "The backend server is unreachable. Please try again later."
          );
        } else {
          errorHandler(error.message || "an unknown error occured");
        }
      } else {
        errorHandler("an unknown error occured");
      }
    },
    []
  );

  const updateTodo = useCallback(async () => {
    console.log("reached updateTodo function");
    if (
      !(
        initialTodoDescription === updatedTodoDescription &&
        initialTodoTitle === updatedTodoTitle
      )
    ) {
      console.log("reached inside if check");
      setBackupTitle(initialTodoTitle);
      setBackupDescription(initialTodoDescription);
      setInitialTodoTitle(updatedTodoTitle);
      setInitialTodoDescription(updatedTodoDescription);
      setIsUpdating(!isUpdating);
      console.log("reached after state logic");
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
    } else {
      console.log("reached in else");
      setIsUpdating(!isUpdating);
      return;
    }
  }, [
    initialTodoDescription,
    initialTodoTitle,
    updatedTodoDescription,
    updatedTodoTitle,
    backupTitle,
    backupDescription,
    isUpdating,
    id, // also include id since it's used inside
    handleCatch,
    handleRequestErrorForUpdate,
  ]);

  const markTodoDone = useCallback(async () => {
    setIsDone(true);
    const jwt = localStorage.getItem("jwt");
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/user/todo/done",
        {
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
        }
      );
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
  }, [id, title, description, handleCatch, handleRequestErrorForDone]);

  const deleteTodo = useCallback(async () => {
    try {
      setIsDone(true);
      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:4000/api/v1/user/todo", {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const data = await response.json();

        setInvalidMessage(data.msg);
        setIsInvalidOrNonExistent(true);
        setIsDone(false);
        setTimeout(() => {
          setInvalidMessage("");
        }, 3000);
        return;
      }
      const data = await response.json();
      setDoneMessage(data.msg);
      setTimeout(() => {
        setDoneMessage("");
      }, 3000);
    } catch (error) {
      handleCatch(error, handleRequestErrorForDelete);
    }
  }, [id, handleCatch, handleRequestErrorForDelete]);

  if (!isDone) {
    return (
      <>
        <div className=" animate-fadeIn flex gap-6 rounded-xl border-4 border-sexyMaroon px-6 pb-4 pt-2 mx-8 transition-all ease-in-out duration-300 my-4 hover:scale-105">
          <DeleteButton onClick={deleteTodo}></DeleteButton>
          <div className="basis-full ">
            {isUpdating ? (
              <>
                <InputField
                  label="title"
                  value={updatedTodoTitle}
                  onChange={(event) => {
                    setUpdatedTodoTitle(event.target.value);
                    console.log(updatedTodoTitle);
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
                  {initialTodoTitle || "Title unavailable"}
                </div>
                <div className="text-l text-sexyPink font-semibold text-opacity-75">
                  {initialTodoDescription || "description unavailable"}
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
