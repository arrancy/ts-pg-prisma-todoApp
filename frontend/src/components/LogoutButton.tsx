import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="flex absolute top-4 left-8 rounded-lg  text-sexyCream bg-sexyMaroon hover:opacity-80 hover:text-opacity-80 text-opacity-45 w-14 hover:w-20 transition-all ease-in-out duration-100"
        onClick={() => {
          localStorage.removeItem("jwt");
          setTimeout(() => {
            navigate("/signin");
          }, 100);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
          />
        </svg>
        <p>logout</p>
      </button>
    </>
  );
}
