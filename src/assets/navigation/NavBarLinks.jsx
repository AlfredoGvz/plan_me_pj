import { NavLink } from "react-router-dom";

const NavBarLinks = (props) => {
  return (
    <nav className={props.className}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/events">Events</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
};

export default NavBarLinks;
