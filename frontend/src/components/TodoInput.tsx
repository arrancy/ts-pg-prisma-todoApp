import { useState } from "react";
import { Button } from "./Button";
import { InputField } from "./InputField";
import { useRecoilState } from "recoil";
import { todosAtom } from "../store/atoms/todosAtom";

export interface TodoInputFormat {
  title: string;
  description: string;
  done: boolean;
  id: null | number;
}
interface errorStateFormat {
  hasError: boolean;
  errorMessage: string;
}
function clearMessage(stateFunction: () => void) {
  setTimeout(stateFunction, 3000);
}

export function TodoInput() {
  const [TodoInput, setTodoInput] = useState<TodoInputFormat>({
    title: "",
    description: "",
    done: false,
    id: null,
  });
  const [errorState, setErrorState] = useState<errorStateFormat>({
    hasError: false,
    errorMessage: "",
  });
  const [addedMessage, setAddedMessage] = useState<string>("");
  const [todos, setTodos] = useRecoilState(todosAtom);
  return (
    <>
      <div className="md:flex gap-6 rounded-xl border-4 border-sexyMaroon px-6 pb-4 pt-2 mx-8 transition-all ease-in-out duration-300 hover:scale-105 my-2 ">
        <div className="basis-full">
          {/*basis full class is there to stretch the flex element to its capacity */}
          <InputField
            label="title"
            onChange={(event) => {
              setTodoInput({ ...TodoInput, title: event.target.value });
            }}
            value={TodoInput.title}
          ></InputField>
          <InputField
            label="description"
            onChange={(event) => {
              setTodoInput({ ...TodoInput, description: event.target.value });
            }}
            value={TodoInput.description}
          ></InputField>
        </div>
        <div className="mt-14">
          <Button
            label={"add todo"}
            onClick={async () => {
              const uniqueId = Date.now() + Math.floor(Math.random() * 100000);
              setTodoInput({ ...TodoInput, id: uniqueId });
              setTodos([...todos, TodoInput]);

              const token = localStorage.getItem("jwt");
              try {
                const response = await fetch(
                  "http://localhost:4000/api/v1/user/todo",
                  {
                    method: "POST",
                    body: JSON.stringify(TodoInput),
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer " + token,
                    },
                  }
                );
                if (!response.ok) {
                  const data = await response.json();
                  setErrorState({
                    hasError: true,
                    errorMessage: "unable to add todo : " + data.msg,
                  });
                  return;
                }
                const data = await response.json();
                const currentTodo = todos.find((todo) => (todo.id = uniqueId));

                if (!currentTodo) {
                  setErrorState({
                    hasError: true,
                    errorMessage: "an unknown error occured",
                  });
                  return;
                }
                const indexOfCurrentTodo = todos.indexOf(currentTodo);
                currentTodo.id = data.todoId;
                setTodos((prevState) => {
                  const updatedState = [...prevState];
                  updatedState[indexOfCurrentTodo] = currentTodo;
                  return updatedState;
                });

                setAddedMessage(data.msg);
                clearMessage(() => {
                  setAddedMessage("");
                });
              } catch (error) {
                setErrorState({ ...errorState, hasError: true });
                if (error instanceof Error) {
                  if (
                    error.name === "TypeError" &&
                    error.message === "Failed to fetch"
                  ) {
                    setErrorState({
                      ...errorState,
                      errorMessage: "server is down, failed to add todo",
                    });
                    clearMessage(() => {
                      setErrorState({ ...errorState, errorMessage: "" });
                    });
                  } else {
                    setErrorState({
                      ...errorState,
                      errorMessage:
                        "failed to add todo, an error occured : " +
                        error.message,
                    });
                    clearMessage(() => {
                      setErrorState({ ...errorState, errorMessage: "" });
                    });
                  }
                } else {
                  setErrorState({
                    ...errorState,
                    errorMessage: "an unknown error occured",
                  });
                  clearMessage(() => {
                    setErrorState({ ...errorState, errorMessage: "" });
                  });
                }
              }
            }}
          ></Button>
        </div>
      </div>
      <div>
        {addedMessage
          ? addedMessage
          : errorState.hasError
          ? errorState.errorMessage
          : null}
      </div>
    </>
  );
}

// how would i do it in case of atom family
// so in the todo component the main todo state will be governed by the atom we get from the todo family,
// id being the one we receive from the props
// on the dashboard component, we want to display todos as components dynamically of course we will use array.map
// the original todo array would definitely have to be retrieved from the endpoint which gives us all the todos
// it gets rendered initially as it passes every id to every dynamically created todo component,
// the initial todoArray will stay the same now and everything will be handled by individual todo components
// only on refreshes or page reloads will the original todo array be recalculated from the backend
