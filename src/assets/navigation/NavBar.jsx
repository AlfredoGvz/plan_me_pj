import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-between	">
      <Link>Home</Link>
      <Link>Events</Link>
      <Link>Contact</Link>
    </nav>
  );
};

export default NavBar;
