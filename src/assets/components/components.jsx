import { Link } from "react-router-dom";
import { IconCalendar, IconClock } from "./Icons";

export const Button = (props) => {
  return (
    <button className={props.className} {...props}>
      {props.inner_text}
    </button>
  );
};

export const EventTile = (props) => {
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
          <Button inner_text={props.action} className={props.className} />
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
