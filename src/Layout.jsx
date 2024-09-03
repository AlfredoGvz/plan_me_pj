import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./assets/navigation/NavBar";
const RootLayout = () => {
  return (
    <main className="h-[100vh]">
      <NavBar />
      <div className="">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
