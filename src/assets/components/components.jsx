import { Link, useNavigate } from "react-router-dom";
import { IconCalendar, IconClock } from "./Icons";
import { useAddToCalendar } from "../../../utilities/customHooks";
import { useEffect, useState } from "react";

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
