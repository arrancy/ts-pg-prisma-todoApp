import { LargeHeading } from "../components/LargeHeading";
import { TodoInput } from "../components/TodoInput";
import { TodoWrapper } from "../components/TodoWrapper";
import { Todo, TodoProp } from "../components/Todo";
import { useRecoilValueLoadable } from "recoil";
import { todosAtom } from "../store/atoms/todosAtom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function DashBoard() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    amIAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function amIAuthenticated() {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:4000/me", {
        headers: {
          "Authorization": "Bearer " + token,
        },
      });
      const data = await response.json();
      if (data.isLoggedIn) {
        setIsLoggedIn(true);
        return;
      } else {
        setIsLoggedIn(false);
        navigate("/signin");
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
          setIsLoggedIn(false);
          navigate("/signin");
          return;
        } else {
          setIsLoggedIn(false);
          navigate("/signin");
          return;
        }
      }
    }
  }

  const todos = useRecoilValueLoadable(todosAtom);
  return (
    isLoggedIn && (
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
    )
  );
}
