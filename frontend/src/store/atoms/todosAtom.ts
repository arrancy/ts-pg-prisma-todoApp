import { atom, selector } from "recoil";
import { TodoInputFormat } from "../../components/TodoInput";

async function getTodos(): Promise<TodoInputFormat[]> {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return [];
  }
  const response = await fetch(
    "https://todobackend-h2grkoksy-ruturajs-projects-5c70c082.vercel.app/api/v1/user/todo",
    {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }
  );
  const data = await response.json();
  return data.todos;
}

export const todosAtom = atom<TodoInputFormat[]>({
  key: "todosAtom",
  default: selector({
    key: "todosAtomSelector",
    get: getTodos,
  }),
});
