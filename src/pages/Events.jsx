import { useGetEvents } from "../../utilities/customHooks";
import { EventTile } from "../assets/components/Components";

const Events = () => {
  const { eventsData, isLoading, error } = useGetEvents("/api/get_events");
  if (isLoading) return <p>Loading events...</p>; // Display loading state
  if (error) return <p>Error loading events: {error.message}</p>; // Display error state

  return (
    <div className="bg-black text-white py-8">
      <div className="w-11/12 m-auto">
        <div className="flex justify-center">
          <div className="w-[20%] my-2 py-5">
            <p className="text-[3rem] font-semibold">EVENTS</p>
          </div>
          <div className="w-[60%] flex flex-col gap-4">
            {Array.isArray(eventsData) && eventsData.length > 0 ? ( // Check if eventsData is an array and not empty
              eventsData.map(
                (
                  currentItem,
                  index // Return JSX elements correctly
                ) => (
                  <EventTile
                    key={index}
                    eventId={currentItem.event_id}
                    date={currentItem.date}
                    start_time={currentItem.start_time}
                    title={currentItem.title}
                    city={currentItem.city}
                    action={"ADD TO CALENDAR"}
                    // ==================
                    generals={"scss_layout_tile border-b-[2px] py-5 my-2"}
                    buttonArea={"tile_button_area"} //
                    classNameBt={"border-2 w-full px-5 py-3 whitespace-nowrap"}
                    generalDetails={"general_details"}
                  />
                )
              )
            ) : (
              <p>No events available.</p> // Fallback if there are no events
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
