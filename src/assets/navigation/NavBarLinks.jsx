import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../App";

const NavBarLinks = (props) => {
  const { user } = useContext(MyContext);
  return (
    <nav className={props.className}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/events">Events</NavLink>
      {user &&
        user.data.user.dataTosend.userInDB[0].user_role !== "attendee" && (
          <NavLink to="/add_event">Add Event</NavLink>
        )}
    </nav>
  );
};

export default NavBarLinks;
