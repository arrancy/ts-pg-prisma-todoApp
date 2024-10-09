import { Button } from "./Button";
import { InputField } from "./InputField";
export interface TodoInputFormat {
  title: string;
  description: string;
}

export function TodoInput() {
  return (
    <>
      <div className="md:flex gap-6 rounded-xl border-4 border-sexyMaroon px-6 pb-4 pt-2 mx-8 transition-all ease-in-out duration-300 hover:scale-105 my-2 ">
        <div className="basis-full">
          {/*basis full class is there to stretch the flex element to its capacity */}
          <InputField label="title" onChange={() => {}}></InputField>
          <InputField label="description" onChange={() => {}}></InputField>
        </div>
        <div className="mt-14">
          <Button label={"add todo"} onClick={() => {}}></Button>
        </div>
      </div>
    </>
  );
}
