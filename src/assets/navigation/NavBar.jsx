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
import { logOut } from "../../../utilities/utilities";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const { toggle, setToggle, user } = useContext(MyContext);
  console.log(user);
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center text-white py-4 bg-black px-20  h-24">
      <NavBarLinks className={"flex gap-6"} />
      <BrandLogo className={"rampart-one-regular text-[3rem]"} />
      <div className="flex gap-2">
        {/* Login button */}
        {!user ? (
          <Button
            inner_text={"Get Started"}
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
          <button
            className={user ? "block" : "hidden"}
            onClick={async (e) => {
              try {
                await axios.delete(
                  `https://sql-be-test.onrender.com/api/delete_user`
                );
                logOut();
              } catch (error) {
                // Optionally, handle error (e.g., show an error message)
                console.error("Error deleting user:", error);
              }
            }}
          >
            Delete User
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
