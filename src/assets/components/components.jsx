import { Link } from "react-router-dom";
import { IconCalendar, IconClock } from "./Icons";

export const Button = (props) => {
  return <button className={props.classNameBt}>{props.innerText}</button>;
};

export const EventTile = (props) => {
  return (
    <div className={props.generals}>
      <div className={props.dateInfo}>
        <div className="flex gap-1">
          <IconCalendar />
          <p>{props.date}</p>
        </div>
        <div className="flex gap-1">
          <IconClock />
          <p>{props.start_time}</p>
        </div>
      </div>
      <div className={props.generalsRight}>
        <div className={props.generalDetails}>
          <Link to={`/events/${props.eventId}/details`}>{props.title}</Link>
          <p>{props.city}</p>
        </div>
        <div className={props.buttonArea}>
          <Button innerText={props.action} classNameBt={props.classNameBt} />
        </div>
      </div>
    </div>
  );
};
