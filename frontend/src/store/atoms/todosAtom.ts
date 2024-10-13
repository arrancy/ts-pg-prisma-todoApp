import { atom, selector } from "recoil";

async function getTodos() {
  const token = localStorage.getItem("jwt");
  const response = await fetch("http://localhost:4000/api/v1/user/todo", {
    headers: {
      "Authorization": "Bearer " + token,
    },
  });
  const data = await response.json();
  return data.todos;
}

export const todosAtom = atom({
  key: "todosAtom",
  default: selector({
    key: "todosAtomSelector",
    get: getTodos,
  }),
});
