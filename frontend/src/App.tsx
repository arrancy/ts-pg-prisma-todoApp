import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
