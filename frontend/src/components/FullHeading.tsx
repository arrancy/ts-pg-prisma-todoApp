import { SubHeading } from "../components/SubHeading";
import { BigHeading } from "../components/bigHeading";

export function FullHeading() {
  return (
    <>
      <div className="text-center pb-4">
        <BigHeading label={"Signin"}></BigHeading>
        <SubHeading label={"into your account"}></SubHeading>
      </div>
    </>
  );
}
