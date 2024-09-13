import { Link, useNavigate } from "react-router-dom";
import { IconCalendar, IconClock } from "./Icons";
import { useAddToCalendar, useGetEvents } from "../../../utilities/customHooks";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyContext } from "../../App";

export const Button = (props) => {
  return (
    <button className={props.className} {...props}>
      {props.inner_text}
    </button>
  );
};

export const EventTile = (props) => {
  const [eventId, setEventId] = useState(null);
  const { registered, isLoadingCal, errorCal } = useAddToCalendar(eventId);
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
    <div className={props.generals}>
      <div className={props.dateInfo}>
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2">
            <IconCalendar />
            {props.date}
          </p>

          <p className="flex items-center gap-2">
            <IconClock />
            {props.start_time}
          </p>
        </div>
      </div>
      <div className={props.generalsRight}>
        <div className={props.generalDetails}>
          <Link to={`/events/${props.eventId}/details`}>{props.title}</Link>
          <p>{props.city}</p>
        </div>
        <div className={props.buttonArea}>
          <Button
            inner_text={props.action}
            className={props.className}
            onClick={handleEvent}
          />
        </div>
      </div>
    </div>
  );
};

export function InputField(props) {
  return (
    <div className="w-full">
      <label htmlFor={props.id}>{props.labelvalue}</label>
      <input {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="w-full">
      <label htmlFor={props.id}>{props.labelvalue}</label>
      <textarea {...props} />
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
        onClick={() => document.getElementById("my_modal_3").showModal()}
      />

      <dialog id="my_modal_3" className="modal">
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userRole, setUserRole] = useState("");
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
  const [toggleForms, setToggleForms] = useState("sign in");

  const navigate = useNavigate(); // Call useNavigate inside the component

  const sendLogInCredentials = async (signInCredentials) => {
    try {
      const loggedUser = await axios.post(
        `https://sql-be-test.onrender.com/api/sign_in`,
        signInCredentials
      );
      localStorage.setItem("user", JSON.stringify(loggedUser));
      navigate("/"); // Redirect after successful login
      window.location.reload();
      console.log(loggedUser);
    } catch (error) {
      console.log(error);
    }
  };
  const sendSignUpCredentials = async (signUpCredentials) => {
    try {
      const loggedUser = await axios.post(
        `https://sql-be-test.onrender.com/api/new_user`,
        signUpCredentials
      );
      navigate("/events"); // Redirect after successful login
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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
              onClick={() => {
                setEmail(""),
                  setPassword(""),
                  setName(""),
                  setSurname(""),
                  setUserRole("");
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
                className={
                  "border_style border-2 px-5 py-3 whitespace-nowrap w-[40%] mx-auto"
                }
                inner_text={toggleForms === "sign in" ? "Login" : "Sign Up"}
                onClick={() => {
                  if (toggleForms === "sign in") {
                    sendLogInCredentials(signInCredentials); // Send credentials and handle login
                  } else {
                    sendSignUpCredentials(signUpCredentials);
                  }
                }}
              />
              <div className="divider">OR</div>
              <button
                className="mb-5"
                to={"new_account"}
                onClick={(e) => {
                  e.preventDefault();

                  if (toggleForms === "sign in") {
                    setToggleForms("sign up");
                  } else if (toggleForms === "sign up") {
                    setToggleForms("sign in");
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
  return (
    <div role="tablist" className={props.className}>
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab w-[fit-content]"
        aria-label="Hosted Events"
        defaultChecked
        onClick={"handleHostedEvents"}
      />
      <div role="tabpanel" className="tab-content">
        <div className="h-[70vh] bg-db-tabs"></div>
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab w-[5rem]"
        aria-label="My next meetings"
      />
      <div role="tabpanel" className="tab-content">
        <div className="h-[70vh] bg-db-tabs"></div>
      </div>
    </div>
  );
}
