import { useState } from "react";
import { Button } from "./Button";
import { InputField } from "./InputField";

export interface TodoInputFormat {
  title: string;
  description: string;
}

export function TodoInput() {
  const [TodoInput, setTodoInput] = useState<TodoInputFormat>({
    title: "",
    description: "",
  });
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
            value={TodoInput.title}
          ></InputField>
        </div>
        <div className="mt-14">
          <Button label={"add todo"} onClick={() => {}}></Button>
        </div>
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
