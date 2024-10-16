import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { DashBoard } from "./pages/Dashboard";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin></Signin>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
