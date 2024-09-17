import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../App";
import AddEvent from "../../pages/AddEvent";

const NavBarLinks = (props) => {
  const { user } = useContext(MyContext);
  let hidden = "";
  !user ? (hidden = "hidden") : (hidden = "block");
  return (
    <nav className={props.className}>
      <NavLink to="/" className={hidden}>
        Dashboard
      </NavLink>
      <NavLink to="/events">Events</NavLink>
      {user &&
        user.data.user.dataTosend.userInDB[0].user_role !== "attendee" && (
          <AddEvent className={"hidden tablet:block"} />
        )}
    </nav>
  );
};

export default NavBarLinks;
