import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IconCalendar, IconClock, IconLocationOutline } from "./Icons";

import { useEffect, useState } from "react";

import {
  useAddToGoogleCalendar,
  useAttendEvent,
  useSignIn,
  useSignUp,
} from "../../../utilities/customHooks";

export const Button = (props) => {
  return (
    <button className={props.className} {...props}>
      {props.inner_text}
    </button>
  );
};

export const EventTile = (props) => {
  const [eventId, setEventId] = useState(null);
  const { registered, isLoadingCal, errorCal } = useAttendEvent(eventId);
  const navigate = useNavigate();
  const handleEvent = () => {
    setEventId(props.eventId); // Set eventId
  };

  // Automatically navigate when registered URL is available
  useEffect(() => {
    if (registered) {
      window.location.href = registered; // Navigate to the checkout URL
    }
  }, [registered, navigate]);
  return (
    <div
      className={
        "grid tablet:grid-cols-[1fr_2fr] laptop:grid-cols-[1fr_2fr_1fr] laptop:py-5 mobile:py-3 event-tile-gradient-background event-tile-classes pl-7 laptop:pl-0 "
      }
    >
      <div className="tablet:flex flex-col gap-1  hidden ml-4 tablet:py-1 laptop:py-2">
        <p className="flex items-center gap-2">
          <IconCalendar />
          {props.date}
        </p>
        <p className="flex items-center gap-2">
          <IconClock />
          {props.start_time}
        </p>
      </div>

      <div className={""}>
        <Link to={`/events/${props.eventId}/details`}>{props.title}</Link>
        <p className="flex items-center gap-1">
          <IconLocationOutline height="1.1em" width="1.1em" />
          {props.city}
        </p>
        <Link
          to={`/events/${props.eventId}/details`}
          className="hidden tablet:block laptop:hidden mt-2 "
        >
          Read More
        </Link>
      </div>

      <div className="flex flex-col gap-1  tablet:hidden">
        <p className="flex items-center gap-2">
          <IconCalendar />
          {props.date}
        </p>
        <p className="flex items-center gap-2">
          <IconClock />
          {props.start_time}
        </p>

        <Link to={`/events/${props.eventId}/details`}>Read More</Link>
      </div>
      <div
        className={
          " tablet:col-span-2 laptop:col-span-1 tablet:flex justify-center"
        }
      >
        <Button
          inner_text={props.action}
          className={"booking_spot_btn border-2 p-3 mt-3 laptop:my-0"}
          onClick={handleEvent}
        />
      </div>
    </div>
  );
};

export function InputField(props) {
  return (
    <div className="w-full">
      <label htmlFor={props.id}>{props.labelvalue}</label>
      <input {...props} required />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="w-full">
      <label htmlFor={props.id}>{props.labelvalue}</label>
      <textarea {...props} required />
    </div>
  );
}

export function Modal(props) {
  return (
    <div>
      <Button
        className={
          "alert_btn border-2 px-5 py-3 whitespace-nowrap transition-all duration-[200ms]"
        }
        inner_text={props.btnDelMSG}
        onClick={() => document.getElementById(props.modal_id).showModal()}
      />

      <dialog id={props.modal_id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mx-auto flex p-4 text-stone-950 bg-[linear-gradient(to_right,__#ff6800,_#dd3557,_#943571,_#45355d,_#1d222b)] rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
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
            <span>Warning</span>
          </div>
          <p className="py-8 text-center ">{props.delMSG}</p>
          <div className={"flex justify-end px-3 py-4"}>
            <Button
              className={"alert_btn  border-2 px-5 py-3 whitespace-nowrap"}
              inner_text={"Continue"}
              onClick={props.handle_delete}
            />
          </div>
        </div>
      </dialog>
    </div>
  );
}

export function EmptyModal(props) {
  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userRole, setUserRole] = useState("");

  const { signIn, loading, error, userData } = useSignIn();
  const { signUp, userDataSignUp, loadingSignUp, errorSignUp } = useSignUp();

  const signInCredentials = {
    email,
    password,
  };
  const signUpCredentials = {
    user_email: email,
    password: password,
    user_name: name + " " + surname,
    user_role: userRole,
  };

  useEffect(() => {
    setErrors(error || errorSignUp);
  }, [error, errorSignUp]);

  const [toggleForms, setToggleForms] = useState("sign in");

  const handleSignIN = (credentials) => {
    signIn(credentials); // Use signIn function here
  };

  const handleSignUp = (credentials) => {
    signUp(credentials); // Use signIn function here
  };

  return (
    <div>
      <Button
        className={"px-5 py-3 whitespace-nowrap"}
        inner_text={props.btnDelMSG}
        onClick={() => document.getElementById("my_modal_3").showModal()}
      />

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <div className="mx-auto mb-9 p-4 text-stone-950 bg-[linear-gradient(to_right,__#ff6800,_#dd3557,_#943571,_#45355d,_#1d222b)] rounded-md">
            {toggleForms.toUpperCase()}
          </div>
          <form method="dialog" className="flex flex-col gap-4 p-2">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={() => {
                setEmail(""),
                  setPassword(""),
                  setName(""),
                  setSurname(""),
                  setUserRole("");
                document.getElementById("my_modal_3").close();
              }}
            >
              ✕
            </button>
            <div>
              <div className={toggleForms === "sign in" ? "hidden" : "block"}>
                <div className="flex gap-4">
                  <InputField
                    value={name}
                    className={props.input_styles}
                    labelvalue={"Name"}
                    id={"name_input"}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <InputField
                    value={surname}
                    className={props.input_styles}
                    labelvalue={"Surname"}
                    id={"surname_input"}
                    onChange={(e) => {
                      setSurname(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-5 my-4">
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      id="option1"
                      name="choice"
                      value="attendee"
                      onClick={(e) => {
                        const value = e.target.value;
                        setUserRole(value);
                      }}
                    />
                    <label htmlFor="option1">Attendee</label>
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      id="option2"
                      name="choice"
                      value="organizer"
                      onClick={(e) => {
                        const value = e.target.value;
                        setUserRole(value);
                      }}
                    />{" "}
                    <label htmlFor="option2">Organizer</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  gap-4">
                <InputField
                  value={email}
                  className={props.input_styles}
                  id={"email_input"}
                  labelvalue={"Email"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <InputField
                  value={password}
                  className={props.input_styles}
                  type={"password"}
                  id={"password_input"}
                  labelvalue={"Password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <Button
                className={`border_style border-2 px-5 py-3 whitespace-nowrap w-[40%] mx-auto booking_spot_btn `}
                inner_text={toggleForms === "sign in" ? "Login" : "Sign Up"}
                onClick={(e) => {
                  e.preventDefault();
                  if (toggleForms === "sign in") {
                    handleSignIN(signInCredentials); // Send credentials and handle login
                  } else {
                    handleSignUp(signUpCredentials);
                  }
                }}
              />

              {(loadingSignUp || loading) && (
                <p className="mx-auto pt-4">Loading...</p>
              )}

              {!loadingSignUp && userDataSignUp?.data?.msg && (
                <p className="text-center pt-3 text-green-400">
                  {userDataSignUp.data.msg}
                </p>
              )}

              {errors && (
                <p className="text-red-500 mx-auto text-center pt-4">
                  {errors}
                </p>
              )}

              <div className="divider">OR</div>
              <button
                className="mb-5"
                to={"new_account"}
                onClick={(e) => {
                  e.preventDefault();
                  setErrors("");
                  if (toggleForms === "sign in") {
                    setToggleForms("sign up");
                    setEmail("");
                    setPassword("");
                  } else if (toggleForms === "sign up") {
                    setToggleForms("sign in");
                    setEmail(""),
                      setPassword(""),
                      setName(""),
                      setSurname(""),
                      setUserRole("");
                  }
                }}
              >
                {toggleForms === "sign in"
                  ? "Create Account"
                  : "Sign in to your account "}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export function TabContent(props) {
  const [loadingEventId, setLoadingEventId] = useState(null); // Track which event is loading
  const { eventAddedURL, sendToCalendarLoading, errorAuthURL } =
    useAddToGoogleCalendar(loadingEventId);

  const handleEventToCal = (event_id) => {
    setLoadingEventId(event_id); // Set the event that is currently being processed
    // Your logic to add the event to the calendar goes here
  };

  return (
    <div
      role="tablist"
      className={` tabs tabs-lifted grid grid-cols-[40%_40%] tablet:grid-cols-[1fr_1fr_1fr] ${props.className} `}
    >
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab [--tab-bg:#003554] [--tab-border-color:#003554]"
        aria-label="Hosted Events"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content">
        <div className="h-[70vh] flex flex-col items-center text-[.9rem] sm:text-[1.2rem] bg-[#eae0d5] py-4 rounded-lg rounded-tl-none tabs_content">
          {Array.isArray(props.my_events) && props.my_events.length > 0 ? (
            props.my_events.map((currentItem, index) => (
              <div
                className="mt-3 gap-4  text-[1.125rem] p-4 bg-cyan-800 w-[100%] event-tile-classes"
                key={index}
              >
                <div className="grid grid-cols-1 tablet:grid-cols-[50%_50%] laptop:grid-cols-[25%_30%_30%] laptop:justify-between laptop:w-[100%] w-[80%] mx-auto ">
                  <div className=" tablet:flex flex-col gap-2 mx-auto hidden">
                    <p className="flex items-center gap-2">
                      <IconCalendar />
                      {currentItem.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <IconClock />
                      {currentItem.start_time}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2  mx-auto ">
                    <Link
                      to={`/events/${currentItem.event_id}/details`}
                      className="flex items-center"
                    >
                      {currentItem.title}
                    </Link>
                    <p className="flex items-center gap-2">
                      {" "}
                      <IconLocationOutline height={"1.5rem"} width={"1.5rem"} />
                      {currentItem.city}
                    </p>
                    <p className="flex items-center gap-2 tablet:hidden ">
                      <IconCalendar />
                      {currentItem.date}
                    </p>
                    <p className="flex items-center gap-2 tablet:hidden ">
                      <IconClock />
                      {currentItem.start_time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="m-auto">No events available.</p>
          )}
        </div>
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab [--tab-bg:#003554] [--tab-border-color:#003554] "
        aria-label="Next meetings"
      />
      <div role="tabpanel" className="tab-content ">
        <div className="h-[70vh] flex flex-col items-center text-[.9rem] sm:text-[1.2rem] bg-[#eae0d5] py-4 rounded-lg rounded-tl-none tabs_content">
          {Array.isArray(props.booked_events) &&
          props.booked_events.length > 0 ? (
            props.booked_events.map((currentItem, index) => (
              <div
                className="mt-3 gap-4  text-[1.125rem] p-4 bg-cyan-800 w-[100%] event-tile-classes relative"
                key={index}
              >
                <div className="grid grid-cols-1 tablet:grid-cols-[50%_50%] laptop:grid-cols-[25%_30%_30%] laptop:justify-between laptop:w-[100%] w-[80%] mx-auto ">
                  <div className=" tablet:flex flex-col gap-2 mx-auto hidden">
                    <p className="flex items-center gap-2">
                      <IconCalendar />
                      {currentItem.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <IconClock />
                      {currentItem.start_time}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2  mx-auto">
                    <Link
                      to={`/events/${currentItem.event_id}/details`}
                      className="flex items-center"
                    >
                      {currentItem.title}
                    </Link>
                    <p className="flex items-center gap-2">
                      {" "}
                      <IconLocationOutline height={"1.5rem"} width={"1.5rem"} />
                      {currentItem.city}
                    </p>
                    <p className="flex items-center gap-2 tablet:hidden ">
                      <IconCalendar />
                      {currentItem.date}
                    </p>
                    <p className="flex items-center gap-2 tablet:hidden ">
                      <IconClock />
                      {currentItem.start_time}
                    </p>
                  </div>
                  <div className="flex justify-center items-center mt-4 laptop:mt-0">
                    {loadingEventId === currentItem.event_id ? ( // Check if this item is loading
                      <div
                        className={"m-auto loader2"}
                        id={currentItem.event_id}
                      ></div>
                    ) : (
                      <Button
                        inner_text={"ADD TO CALENDAR"}
                        className={
                          "booking_spot_btn border-2 py-3 px-2 whitespace-nowrap m-auto"
                        }
                        onClick={() => handleEventToCal(currentItem.event_id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="m-auto">No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function TabContentAtt(props) {
  const [eventIdCal, setEventIdCal] = useState(null);
  const { eventAddedURL, sendToCalendarLoading, errorAuthURL } =
    useAddToGoogleCalendar(eventIdCal);
  const handleEventToCal = (event_id) => {
    setEventIdCal(event_id); // Set eventId
  };

  return (
    <div
      role="tablist"
      className={` tabs tabs-lifted grid grid-cols-[40%_40%] tablet:grid-cols-[1fr_1fr_1fr] ${props.className} `}
    >
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab [--tab-bg:#003554] [--tab-border-color:#003554] "
        aria-label="Next meetings"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content ">
        <div className="h-[70vh] flex flex-col items-center text-[.9rem] sm:text-[1.2rem] bg-[#eae0d5] py-4 rounded-lg rounded-tl-none tabs_content">
          {Array.isArray(props.booked_events) &&
          props.booked_events.length > 0 ? (
            props.booked_events.map((currentItem, index) => (
              <div
                className="mt-3 gap-4  text-[1.125rem] p-4 bg-cyan-800 w-[100%] event-tile-classes"
                key={index}
              >
                <div className="grid grid-cols-1 tablet:grid-cols-[50%_50%] laptop:grid-cols-[25%_30%_30%] laptop:justify-between laptop:w-[100%] w-[80%] mx-auto ">
                  <div className=" tablet:flex flex-col gap-2 mx-auto hidden">
                    <p className="flex items-center gap-2">
                      <IconCalendar />
                      {currentItem.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <IconClock />
                      {currentItem.start_time}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2  mx-auto ">
                    <Link
                      to={`/events/${currentItem.event_id}/details`}
                      className="flex items-center"
                    >
                      {currentItem.title}
                    </Link>
                    <p className="flex items-center gap-2">
                      {" "}
                      <IconLocationOutline height={"1.5rem"} width={"1.5rem"} />
                      {currentItem.city}
                    </p>
                    <p className="flex items-center gap-2 tablet:hidden ">
                      <IconCalendar />
                      {currentItem.date}
                    </p>
                    <p className="flex items-center gap-2 tablet:hidden ">
                      <IconClock />
                      {currentItem.start_time}
                    </p>
                  </div>

                  <div className="flex justify-center items-center mt-4 laptop:mt-0 ">
                    {eventIdCal === currentItem.event_id ? (
                      <div className={"m-auto loader2"}></div>
                    ) : (
                      <Button
                        inner_text={"ADD TO CALENDAR"}
                        className={
                          "booking_spot_btn border-2 py-3 px-2 whitespace-nowrap m-auto"
                        }
                        onClick={() => handleEventToCal(currentItem.event_id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="m-auto">No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function PaginationUI(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const lastItemId = props.all_events[props.all_events.length - 1].event_id;
  const lastItmeIdFiltered =
    props.event_data[props.event_data.length - 1].event_id;

  let page_param = parseInt(searchParams.get("page")) || 1; // Default to 1 if undefined
  let totalPages = Math.ceil(props.all_events.length / 10);

  // Handle the page decrement
  const handlePrevPage = () => {
    if (page_param > 1) {
      // Retain all parameters and only update the page
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set("page", page_param - 1); // Update page param
      setSearchParams(updatedParams); // Apply updated params to the URL
      window.location.reload();
    }
  };

  // Handle the page increment
  const handleNextPage = () => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", page_param + 1); // Update page param
    setSearchParams(updatedParams); // Apply updated params to the URL
    window.location.reload();
  };

  return (
    <div className=" my-8 flex ">
      <div className="join mx-auto ">
        <button
          // Disable the button if page_param is 1 (first page)
          disabled={page_param === 1}
          className="join-item btn bg-[#015d87] text-[#f9f9f9]"
          onClick={handlePrevPage} // Call the handler on click
        >
          «
        </button>
        <button className="join-item btn bg-[#015d87] text-[#f9f9f9]">
          Page {page_param} of {totalPages}
        </button>
        <button
          className="join-item btn bg-[#015d87] text-[#f9f9f9]"
          disabled={lastItemId === lastItmeIdFiltered ? true : false}
          onClick={handleNextPage}
        >
          »
        </button>
      </div>
    </div>
  );
}
