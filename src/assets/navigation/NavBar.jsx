import { Link } from "react-router-dom";
import {
  BrandLogo,
  IconInstagramOutline,
  IconProfile,
  IconYoutubeOutlined,
} from "../components/Icons";

import NavBarLinks from "./NavBarLinks";
import { Button, EmptyModal } from "../components/Components";
import { useContext } from "react";
import { MyContext } from "../../App";
import { logOut } from "../../../utilities/utilities";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user } = useContext(MyContext);

  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center text-white py-4 px-20  h-24">
      <NavBarLinks className={"flex gap-6"} />
      <BrandLogo className={"rampart-one-regular text-[3rem]"} />
      <div className="flex gap-2">
        {/* Login button */}
        {!user ? (
          <EmptyModal
            btnDelMSG={"Get Started"}
            input_styles={
              "bg-[#778da9] flex rounded-md w-full px-[.5rem] py-[.5rem]"
            }
          />
        ) : (
          <Button
            inner_text={"Logout"}
            onClick={() => {
              logOut();
              navigate("/events");
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
