import { Outlet } from "react-router-dom";
import { NavBar } from "./assets/navigation/NavBar";

const RootLayout = () => {
  return (
    <main className="h-[100vh]  ">
      <NavBar />
      <div className="tablet:py-[4rem]">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
