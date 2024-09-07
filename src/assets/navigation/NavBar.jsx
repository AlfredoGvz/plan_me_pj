import { Link } from "react-router-dom";
import {
  BrandLogo,
  IconInstagramOutline,
  IconProfile,
  IconYoutubeOutlined,
} from "../components/Icons";

import NavBarLinks from "./NavBarLinks";
import { Button } from "../components/Components";
import { useContext } from "react";
import { MyContext } from "../../App";
import { logOut } from "../../../utilities/customHooks";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { toggle, setToggle, user } = useContext(MyContext);
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center text-white py-4 bg-black px-20  h-24">
      <NavBarLinks className={"flex gap-6"} />
      <BrandLogo className={"rampart-one-regular text-[3rem]"} />
      <div className="flex gap-2">
        {/* Login button */}
        {!user ? (
          <Button
            inner_text={"Login"}
            onClick={() => {
              setToggle(!toggle);
            }}
          />
        ) : (
          <Button
            inner_text={"Logout"}
            onClick={() => {
              logOut();
              navigate("/");
            }}
          />
        )}

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
