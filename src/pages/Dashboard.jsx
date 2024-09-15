import { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";
import HelloLogo from "../assets/components/happy-man-svgrepo-com.svg";
import { logOut } from "../../utilities/utilities";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, TabContent } from "../assets/components/Components";
import { useGetHostedEvents } from "../../utilities/customHooks";
// Ping the server every 10 minutes to keep it active (10 minutes = 600,000 milliseconds)
const Dashbooard = () => {
  const { user } = useContext(MyContext);
  const [endPoint, setEndPoint] = useState(null);
  const name = user?.data?.user?.dataTosend?.userInDB?.[0]?.user_name;
  const user_role = user?.data?.user?.dataTosend?.userInDB?.[0]?.user_role;
  const handleDeleteUser = async () => {
    await axios.delete(`https://sql-be-test.onrender.com/api/delete_user`);
    navigate("/events");
    logOut();
    localStorage.clear();
  };
  const { hostedEvents, isLoading, error } = useGetHostedEvents(endPoint);
  useEffect(() => {
    setEndPoint("/api/get_hosted_events");
  }, []);

  const firstName = name ? name.split(" ") : "";
  const navigate = useNavigate();
  return (
    <div className="w-[90%] tablet:w-[80%] desktop:grid mx-auto grid-cols-[33%_67%] gap-8 h-[calc(100vh-96px)]">
      {/* WELCOME PANEL*/}
      <div className="">
        <div className={"welcome_panel"}>
          <div className="mt-auto flex flex-col gap-2 p-2 ">
            <h1 className="text-2xl">Hello {firstName[0]}!</h1>
            <p>We are glad to see you back.</p>
          </div>
          <img src={HelloLogo} className="w-[40%] " />
        </div>
        <div
          className={`mx-auto ${
            user_role === "attendee" ? "buttons_grid_att" : "buttons_grid_org"
          } my-3`}
        >
          <NavLink
            className={`btn btn-outline btn-secondary text-nowrap ${
              user_role === "attendee" ? "hidden" : "block"
            } flex`}
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
        <div>
          {/* DANGER ZONE DELETE PROFILE */}
          <div className="my-10 tablet:block hidden">
            <div className="modal_warning_strip my-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>DANGER ZONE</span>
            </div>

            <p className={"mb-6"}>
              By deleting your account, you will permanently lose access to all
              services associated with this app. This action will also remove
              all your events and personal information from our records..
            </p>

            <Modal
              btnDelMSG={"DELETE ACCOUNT"}
              delMSG={"You are about to delete your account."}
              handle_delete={handleDeleteUser}
            />
          </div>
        </div>
      </div>
      {/* Dashboard tabs */}
      <div className="flex gap-8">
        <div className=" w-full">
          <TabContent
            className={"w-[100%] tabs tabs-bordered sm:tabs-lg lg:my-0"}
            my_events={hostedEvents}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashbooard;
