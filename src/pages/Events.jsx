import { useState } from "react";
import { useGetEvents } from "../../utilities/customHooks";
import { EventTile, PaginationUI } from "../assets/components/Components";
import { handleNextTen, handlePreviousTen } from "../../utilities/utilities";
import { SortByDsk } from "../assets/components/UserInteraction";

const Events = () => {
  const [page, setPage] = useState(1);
  const { eventsData, allEvents, isLoading, error } =
    useGetEvents("/api/get_events");

  if (isLoading)
    return (
      <div className=" body-height flex justify-center items-center">
        <div>
          <div className="loader"></div>
        </div>
      </div>
    );
  if (error) return <p>Error loading events: {error.message}</p>; // Display error state

  return (
    <div className="text-white">
      <div className="laptop:w-11/12 m-auto">
        <div className="flex justify-center">
          <div className="w-[20%] my-2 py-5">
            <div className="fixed">
              <p className="text-[2.5rem] tablet:text-[3rem] vertical-text mx-[-1rem] laptop:mx-[0rem]">
                EVENTS
              </p>
              <div className="hidden tablet:block">
                <SortByDsk />
              </div>
            </div>
          </div>
          <div className="tablet:w-[60%] w-[67%] flex flex-col gap-4">
            <div className="collapse bg-base-200 flex tablet:hidden">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-small">
                Sort Events
              </div>
              <div className="collapse-content">
                <SortByDsk />
              </div>
            </div>
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
                    action={"BOOK A SPOT"}
                  />
                )
              )
            ) : (
              <p>No events available.</p> // Fallback if there are no events
            )}
            <PaginationUI
              nextTen={handleNextTen}
              previousTen={handlePreviousTen}
              set_page={setPage}
              page={page}
              event_data={eventsData}
              all_events={allEvents}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
