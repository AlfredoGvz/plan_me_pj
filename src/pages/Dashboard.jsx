import { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";
import HelloLogo from "../assets/components/happy-man-svgrepo-com.svg";
import { logOut } from "../../utilities/utilities";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  useActivateCalendar,
  useGetBookedEvents,
  useGetHostedEvents,
} from "../../utilities/customHooks";
import AddEvent from "./AddEvent";
import {
  Modal,
  TabContent,
  TabContentAtt,
} from "../assets/components/Components";

// Ping the server every 10 minutes to keep it active (10 minutes = 600,000 milliseconds)
const Dashbooard = () => {
  const { user } = useContext(MyContext);
  const [endPointHosted, setEndPointHosted] = useState(null);
  const [endPointBooked, setEndPointBooked] = useState(null);
  const [endPointCalendar, setendPointCalendar] = useState(null);
  const name = user?.data?.user?.dataTosend?.userInDB?.[0]?.user_name;
  const user_role = user?.data?.user?.dataTosend?.userInDB?.[0]?.user_role;
  const handleDeleteUser = async () => {
    await axios.delete(`https://shttps://event-planing-project-api.onrender.com
ql-be-test.onrender.com/api/delete_user`);
    navigate("/");
    logOut();
    localStorage.clear();
  };
  const { hostedEvents, isLoading, error } = useGetHostedEvents(endPointHosted);
  const { bookedEvents, isBookedLoading, errorBooked } =
    useGetBookedEvents(endPointBooked);
  const { authURL, authURLLoading, errorAuthURL } =
    useActivateCalendar(endPointCalendar);

  useEffect(() => {
    setEndPointHosted("/api/get_hosted_events");
    setEndPointBooked("/api/get_booked_events");
  }, [hostedEvents, bookedEvents]);

  const firstName = name ? name.split(" ") : "";
  const navigate = useNavigate();
  const handleCalendarAuth = (endPointCal) => {
    setendPointCalendar(endPointCal);
  };

  useEffect(() => {
    if (authURL) {
      // Open the authURL in a new tab once it is available
      window.open(authURL, "_blank");
    }
  }, [authURL]);
  return (
    <div className="w-[90%] tablet:w-[80%] desktop:grid mx-auto grid-cols-[35%_65%] gap-6 h-[calc(100vh-96px)]">
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
          {user_role === "organizer" && (
            <AddEvent
              className={`btn w-full btn-outline btn-secondary text-nowrap flex`}
            />
          )}
          <NavLink to="/" className="btn btn-outline btn-secondary text-nowrap">
            See Events
          </NavLink>
          <button
            className="btn btn-outline btn-secondary text-nowrap"
            onClick={() => {
              handleCalendarAuth("/api/google_auth/add_calendar");
            }}
          >
            Add Calendar
          </button>
          <button
            className="btn btn-outline btn-default text-nowrap"
            onClick={() => {
              logOut();
              navigate("/");
            }}
          >
            Log Out
          </button>
        </div>
        <div>
          {/* DANGER ZONE DELETE PROFILE */}
          <div className="my-10 hidden laptop:block">
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
              btnDelMSG="DELETE ACCOUNT"
              delMSG="You are about to delete your account. This action cannot be undone."
              handle_delete={handleDeleteUser}
              modal_id={"del_acc_mod"}
            />
          </div>
        </div>
      </div>
      {/* Dashboard tabs */}
      <div className="flex flex-col gap-8">
        <div className="w-full">
          {user_role === "organizer" ? (
            <TabContent
              className={
                "w-[100%] tabs tabs-bordered tablet:tabs-lg mt-8 laptop:my-0"
              }
              my_events={hostedEvents}
              booked_events={bookedEvents}
            />
          ) : (
            <TabContentAtt
              className={
                "w-[100%] tabs tabs-bordered tablet:tabs-lg mt-8 laptop:my-0"
              }
              booked_events={bookedEvents}
            />
          )}
        </div>
        {/* DANGER ZONE DELETE PROFILE MOBILE*/}
        <div className="my-10 block laptop:hidden">
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
            services associated with this app. This action will also remove all
            your events and personal information from our records..
          </p>

          <Modal
            btnDelMSG="DELETE ACCOUNT"
            delMSG="You are about to delete your account. This action cannot be undone."
            handle_delete={handleDeleteUser}
            modal_id={"del_acc_mod_mob"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashbooard;
