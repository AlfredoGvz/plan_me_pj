import { Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className="">
      <Outlet />
    </main>
  );
};

export default RootLayout;
