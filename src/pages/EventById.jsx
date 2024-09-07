import { useParams } from "react-router-dom";
import { useGetEventById } from "../../utilities/customHooks";
import {
  IconBxBuildingHouse,
  IconCalendar,
  IconClock,
  IconLocationOutline,
  IconTicketOutline,
  IconPersonCheck,
} from "../assets/components/Icons";
import { Button } from "../assets/components/Components";
import { useContext } from "react";
import { MyContext } from "../App";
import LogInForm from "../assets/components/LogInForm";
const EventById = () => {
  const { toggle } = useContext(MyContext); // Ensure toggle is a boolean
  const { event_id } = useParams();
  const { eventByIdData, isLoading, error } = useGetEventById(
    event_id,
    "/api/get_events"
  );

  if (isLoading) {
    return (
      <div className="bg-black body-height flex justify-center items-center">
        <div>
          <div className="loader"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-black text-white body-height">
        <LogInForm className={toggle ? "block" : "hidden"} />
        <div className="event_by_id_page max-w-[80%] w-fit mx-auto  px-[10rem] py-[3rem]">
          <h1 className="text-[2rem]">{eventByIdData[0].title}</h1>
          <div className="event_details gap-5 my-5">
            <div>
              <IconCalendar />
              <p>{eventByIdData[0].date}</p>
            </div>
            <div>
              <IconClock />
              <p>{eventByIdData[0].start_time} -</p>
              <p>{eventByIdData[0].end_time}</p>
            </div>
            <div>
              <IconPersonCheck height={"1.5rem"} width={"1.5rem"} />
              <p>{eventByIdData[0].organizer_name}</p>
            </div>
            <div>
              <IconBxBuildingHouse height={"1.5rem"} width={"1.5rem"} />{" "}
              <p>{eventByIdData[0].venue}</p>
            </div>
            <div>
              <IconLocationOutline height={"1.5rem"} width={"1.5rem"} />{" "}
              <p>
                {eventByIdData[0].address}, {eventByIdData[0].city},{" "}
                {eventByIdData[0].post_code}
              </p>
            </div>
            <div>
              <IconTicketOutline height={"1.5rem"} width={"1.5rem"} />
              <p>
                {eventByIdData[0].price === "Free"
                  ? ` ${eventByIdData[0].price}`
                  : ` £${eventByIdData[0].price}`}
              </p>
            </div>
          </div>
          <div className="my-8">
            <Button
              inner_text={"BOOK A SPOT"}
              className={
                "booking_spot_btn border-2 px-5 py-3 whitespace-nowrap"
              }
            />
          </div>
          <div className="leading-[1.8rem]">
            <p>{eventByIdData[0].description}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default EventById;
