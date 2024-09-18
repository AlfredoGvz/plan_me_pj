import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout";
import Dashbooard from "./pages/Dashboard";
import Events from "./pages/Events";
import EventById from "./pages/EventById";
import AddEvent from "./pages/AddEvent";
import { createContext, useState } from "react";
import { pingServer } from "../utilities/utilities";

export const MyContext = createContext();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="dashboard" element={<Dashbooard />} />
      <Route index element={<Events />} />
      <Route path="add_event" element={<AddEvent />} />
      <Route path="events/:event_id/details" element={<EventById />}></Route>
    </Route>
  )
);

setInterval(pingServer, 10 * 60 * 1000);

const App = () => {
  const [toggle, setToggle] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const values = { toggle, setToggle, user };

  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
};

export default App;
