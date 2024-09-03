import { Link } from "react-router-dom";
import {
  BrandLogo,
  IconInstagramOutline,
  IconProfile,
  IconYoutubeOutlined,
} from "../components/Icons";

import NavBarLinks from "./NavBarLinks";
const NavBar = () => {
  return (
    <nav className="flex justify-between items-center text-white py-4 bg-black px-20">
      <NavBarLinks className={"flex gap-6"} />
      <BrandLogo className={"rampart-one-regular text-[3rem]"} />
      <div className="flex gap-2">
        {/* Login button */}
        <Link className="flex gap-1 items-center" to="/login">
          <p>Login</p>
          <IconProfile height={"1.5rem"} width={"1.5rem"} />
        </Link>

        {/* Social media */}
        <div className="flex gap-6 items-center px-4">
          <Link>
            <IconYoutubeOutlined height={"1.8rem"} width={"1.8rem"} />
          </Link>
          <Link>
            <IconInstagramOutline height={"1.5rem"} width={"1.5rem"} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
