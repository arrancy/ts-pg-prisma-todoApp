import { LargeHeading } from "../components/LargeHeading";
import { TodoInput } from "../components/TodoInput";
import { TodoWrapper } from "../components/TodoWrapper";
import { Todo, TodoProp } from "../components/Todo";
import { useRecoilValueLoadable } from "recoil";
import { todosAtom } from "../store/atoms/todosAtom";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function DashBoard() {
  const todos = useRecoilValueLoadable(todosAtom);
  return (
    <>
      <div className="relative h-screen w-screen bg-sexyCream py-4">
        {/* Background layer with brightness applied */}
        <div className="absolute inset-0 bg-sexyCream brightness-75 z-0"></div>

        {/* Content layer that is not affected by the brightness */}
        <div className="relative z-10">
          <LargeHeading label="your todos" />
          <TodoWrapper>
            <TodoInput />

            {todos.state === "loading" ? (
              <LoadingSpinner></LoadingSpinner>
            ) : todos.state === "hasError" ? (
              "error fetching todos"
            ) : todos.state === "hasValue" ? (
              todos.contents.map((todo: TodoProp) => (
                <Todo
                  title={todo.title}
                  key={todo.id}
                  description={todo.description}
                  id={todo.id}
                  done={todo.done}
                ></Todo>
              ))
            ) : (
              ""
            )}
            {/* <Todo
              title="hello"
              description="world  slkjdfdsljaslkjdfdsljaslkjdfdsljaslkjdfdsljaslkjdfdsljaslkjdfdslja slkjdfdslja slkjdfdslja slkjdfdslja slkjdfdslja slkjdfdslja slkjdfdslja slkjdfdslja slkjdfdslja slkjdfdslja slkjdfdslja slkjdfdslja"
              done={false}
              id={1}
            ></Todo> */}
          </TodoWrapper>
        </div>
      </div>
    </>
  );
}
