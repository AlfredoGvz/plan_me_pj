import { useContext } from "react";
import { MyContext } from "../App";
import HelloLogo from "../assets/components/happy-man-svgrepo-com.svg";
import { logOut } from "../../utilities/utilities";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { TabContent } from "../assets/components/Components";
// Ping the server every 10 minutes to keep it active (10 minutes = 600,000 milliseconds)

const Dashbooard = () => {
  const { user } = useContext(MyContext);
  const name = user?.data?.user?.dataTosend?.userInDB?.[0]?.user_name;

  const firstName = name ? name.split(" ") : "";
  const navigate = useNavigate();
  return (
    <div className="w-[90%] lg:grid lg:w-[80%] mx-auto grid-cols-[2fr_3fr] gap-4 h-[100vh]  h-[calc(100vh-96px)]">
      {/* This div contains the top section of the dashboard */}
      <div className="sm:w-[75%] md:w-full">
        <div
          className={
            "flex justify-between bg-[#343A40] p-2 rounded-lg  bg-[linear-gradient(to_right_top,_#023047,_#07435d,_#0d5673,_#126b89,_#18809f,_#2a8dac,_#399bba,_#47a9c7,_#5bb1cf,_#6db9d7,_#7ec2de,_#8ecae6)]"
          }
        >
          <div className="mt-auto flex flex-col gap-2 p-2 ">
            <h1 className="text-2xl">Hello {firstName[0]}!</h1>
            <p>We are glad to see you back.</p>
          </div>
          <img src={HelloLogo} className="w-[40%] " />
        </div>
        <div className="mx-auto buttons_grid  w-[95%]">
          <NavLink
            className="btn btn-outline btn-secondary text-nowrap"
            to="/add_event"
          >
            Create Event
          </NavLink>
          <NavLink
            to="/events"
            className="btn btn-outline btn-secondary text-nowrap"
          >
            See Events
          </NavLink>
          <button className="btn btn-outline btn-secondary text-nowrap">
            Add Calendar
          </button>
          <button
            className="btn btn-outline btn-default text-nowrap"
            onClick={() => {
              logOut();
              navigate("/events");
            }}
          >
            Log Out
          </button>
        </div>
      </div>
      {/* Dashboard tabs */}
      <div className="flex gap-8">
        <div className=" w-full">
          <TabContent
            className={"w-[100%] tabs tabs-bordered sm:tabs-lg my-12 lg:my-0"}
          />
          <button
            className="btn btn-outline btn-error text-nowrap"
            onClick={async () => {
              await axios.delete(
                `https://sql-be-test.onrender.com/api/delete_user`
              );
              navigate("/events");
              logOut();
            }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashbooard;
