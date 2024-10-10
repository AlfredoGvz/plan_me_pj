import { Link } from "react-router-dom";
import {
  BrandLogo,
  IconInstagramOutline,
  IconYoutubeOutlined,
} from "../components/Icons";

import NavBarLinks from "./NavBarLinks";
import { Button, EmptyModal } from "../components/Components";
import { useContext } from "react";
import { MyContext } from "../../App";
import { logOut } from "../../../utilities/utilities";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { user } = useContext(MyContext);
  console.log(user);
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center text-white laptop:py-4 laptop:px-20 px-10 h-24 nav-bar">
      <Link
        to={user ? "/dashboard" : "/"}
        className="hidden tablet:flex gap-2 items-center "
      >
        <BrandLogo
          className={"rampart-one-regular text-[3rem] hidden tablet:block "}
          width={"4rem"}
          height={"4rem"}
        />
        <p className="londrina-shadow text-[2rem]">PLAN ME</p>
      </Link>
      <div className="flex items-center gap-6 laptop:text-[1.15rem]">
        <NavBarLinks className={"flex gap-6"} />
        <div className="flex gap-2">
          {/* Login button */}
          {!user ? (
            <EmptyModal
              btnDelMSG={"Log In"}
              input_styles={"bg-[#778da9] flex  w-full px-[.5rem] py-[.5rem]"}
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
          <div className="tablet:flex gap-6 items-center px-4 hidden">
            <Link>
              <IconYoutubeOutlined height={"1.8rem"} width={"1.8rem"} />
            </Link>
            <Link>
              <IconInstagramOutline height={"1.5rem"} width={"1.5rem"} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
