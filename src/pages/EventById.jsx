import { useNavigate, useParams } from "react-router-dom";
import {
  useAddToGoogleCalendar,
  useAttendEvent,
  useDeleteEvent,
  useGetEventById,
} from "../../utilities/customHooks";
import {
  IconBxBuildingHouse,
  IconCalendar,
  IconClock,
  IconLocationOutline,
  IconTicketOutline,
  IconPersonCheck,
} from "../assets/components/Icons";

import { Button, Modal } from "../assets/components/Components";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";

const EventById = () => {
  const { user } = useContext(MyContext); // Ensure toggle is a boolean
  const { event_id } = useParams();

  const [eventToDelete, setEventToDelete] = useState(null);
  const [eventId, setEventId] = useState(null);

  const { eventByIdData, isLoading, error } = useGetEventById(
    event_id,
    "/api/get_events"
  );
  const { registered, isLoadingCal, errorCal } = useAttendEvent(eventId);
  const { isLoadingDel, errorDel } = useDeleteEvent(eventToDelete);

  const navigate = useNavigate();

  const handleDelete = () => {
    setEventToDelete(event_id); // Set the event to delete
  };
  const handleEvent = () => {
    setEventId(event_id); // Set eventId
  };

  useEffect(() => {
    if (!isLoadingDel && eventToDelete && !errorDel) {
      // Only navigate when deletion completes and no errors occur
      navigate("/");
    }
  }, [isLoadingDel, eventToDelete, errorDel, navigate]);

  useEffect(() => {
    if (registered) {
      window.location.href = registered; // Navigate to the checkout URL
    }
  }, [registered, navigate]);

  if (isLoading) {
    return (
      <div className="body-height flex justify-center items-center">
        <div>
          <div className="loader"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-white body-height w-[90%] laptop:w-[80%] mx-auto">
        <div className="my-12">
          <h1 className="text-[3rem]">{eventByIdData[0].title}</h1>
          <div className="gap-5 my-5 grid mobile:grid-cols-[repeat(2,_1fr)] tablet:grid-cols-[repeat(3,_30%)]">
            <div className="flex gap-1 laptop:gap-3 items-center">
              <IconPersonCheck height={"1.5rem"} width={"1.5rem"} />
              <p>{eventByIdData[0].organizer_name}</p>
            </div>
            <div className="flex gap-1 laptop:gap-3 items-center">
              <IconCalendar />
              <p>{eventByIdData[0].date}</p>
            </div>
            <div className="flex gap-1 laptop:gap-3 items-center">
              <IconClock />
              <p>{eventByIdData[0].start_time} -</p>
              <p>{eventByIdData[0].end_time}</p>
            </div>
            <div className="flex gap-1 laptop:gap-3 items-center">
              <IconTicketOutline height={"1.5rem"} width={"1.5rem"} />
              <p>
                {eventByIdData[0].price === "Free"
                  ? ` ${eventByIdData[0].price}`
                  : ` £${eventByIdData[0].price}`}
              </p>
            </div>
            <div className="flex gap-1 laptop:gap-3 items-center  col-span-2 tablet:col-span-1 ">
              <IconBxBuildingHouse height={"1.5rem"} width={"1.5rem"} />{" "}
              <p>{eventByIdData[0].venue}</p>
            </div>

            <div className="flex gap-1 laptop:gap-3 items-center col-span-2 tablet:col-span-1">
              <IconLocationOutline height={"1.5rem"} width={"1.5rem"} />{" "}
              <p>
                {eventByIdData[0].address}, {eventByIdData[0].city},{" "}
                {eventByIdData[0].post_code}
              </p>
            </div>
          </div>
          <div className="my-8 flex gap-3">
            {user?.data?.user?.dataTosend?.userInDB[0]?.user_role ===
            "attendee" ? (
              <Button
                inner_text={"BOOK A SPOT"}
                className={
                  "booking_spot_btn border-2 px-5 py-3 whitespace-nowrap"
                }
                onClick={handleEvent}
              />
            ) : null}

            <div
              className={
                eventByIdData[0]?.organizer_id ===
                user?.data?.user?.dataTosend?.userInDB[0]?.user_id
                  ? "block"
                  : "hidden"
              }
            >
              <Modal
                btnDelMSG="DELETE THIS EVENT"
                delMSG={`You are about to delete the event: "${eventByIdData[0].title}". This action cannot be undone.`}
                handle_delete={handleDelete}
                modal_id={"event_by_id_page"}
              />
            </div>
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
