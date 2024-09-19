import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useGetEvents(endpoint, filters) {
  const [eventsData, setEventsData] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://sql-be-test.onrender.com${endpoint}`,
          {
            params: filters, // Pass filters as query params
          }
        );

        if (response && response.data && response.data.events) {
          setEventsData(response.data.events); // Correctly set the data from response
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [endpoint, filters]);

  return { eventsData, isLoading, error };
}

export function useGetEventById(event_id, endpoint) {
  const [eventByIdData, setEventByIdData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEventById = async () => {
      try {
        const response = await axios.get(
          `https://sql-be-test.onrender.com${endpoint}/${event_id}`
        );
        if (response && response.data && response.data.event) {
          setEventByIdData(response.data.event); // Correctly set the data from response
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventById();
  }, [event_id]);
  return { eventByIdData, isLoading, error };
}

export function useLogIn(endpoint, credentials, send, setSend) {
  const [userLogged, setUserLogged] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (send) {
      const signUserIn = async () => {
        setIsLoading(true);
        try {
          const logger = await axios.post(
            `https://sql-be-test.onrender.com${endpoint}`,
            credentials
          );
          setUserLogged(logger.data.user);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
          setSend(false); // Reset send to false after request
        }
      };
      signUserIn();
    }
  }, [send, credentials, endpoint, setSend]);

  return { userLogged, isLoading, error };
}
export function useSender(endpoint, event) {
  const [isLoading, setIsLoading] = useState(false); // Start as false
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only attempt to send the event if event is defined
    if (!event) return;

    const sendEvent = async () => {
      setIsLoading(true); // Set loading to true when the request starts
      try {
        const logger = await axios.post(
          `https://sql-be-test.onrender.com${endpoint}`,
          event
        );
        console.log("Event sent successfully", logger.data);
      } catch (err) {
        setError(err);
        console.error("Error sending event:", err);
      } finally {
        setIsLoading(false); // Set loading to false after the request
        window.location.reload();
      }
    };

    sendEvent(); // Call the function to send the event
  }, [endpoint, event]); // Re-run when endpoint or event changes

  return { isLoading, error };
}

export function useDeleteEvent(event_id) {
  const [isLoadingDel, setIsLoadingDel] = useState(false); // Start as false
  const [errorDel, setErrorDel] = useState(null);

  useEffect(() => {
    if (!event_id) return; // Do nothing if event_id is not set

    const sendEvent = async () => {
      setIsLoadingDel(true); // Set loading to true when the request starts
      try {
        const del = await axios.delete(
          `https://sql-be-test.onrender.com/api/${event_id}/delete_event`
        );
        console.log("Event deleted successfully", del);
      } catch (err) {
        setErrorDel(err);
        console.error("Error deleting event:", err);
      } finally {
        setIsLoadingDel(false); // Set loading to false after the request
      }
    };

    sendEvent(); // Call the function to delete the event
  }, [event_id]); // Re-run only when event_id changes

  return { isLoadingDel, errorDel };
}

export function useAttendEvent(event_id) {
  const [registered, setRegistered] = useState("");
  const [isLoadingCal, setIsLoadingCal] = useState(false);
  const [errorCal, setErrorCal] = useState(null);

  useEffect(() => {
    if (!event_id) return; // Do nothing if event_id is not set

    const addToCalendar = async () => {
      setIsLoadingCal(true); // Set loading to true when the request starts
      try {
        const register = await axios.post(
          `https://sql-be-test.onrender.com/api/${event_id}/register`
        );
        const checkoutURL = register.data.attendee.checkoutSession.url;
        setRegistered(checkoutURL); // Set checkout URL
      } catch (err) {
        setErrorCal(err);
        console.error("Error adding event to calendar:", err);
      } finally {
        setIsLoadingCal(false); // Set loading to false after the request
      }
    };

    addToCalendar(); // Call the function to register for the event
  }, [event_id]);

  return { registered, isLoadingCal, errorCal };
}

export function useGetHostedEvents(endpoint) {
  const [hostedEvents, setHostedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostedEvents = async () => {
      // Ensure endpoint exists before making API call
      if (!endpoint) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://sql-be-test.onrender.com${endpoint}`
        );
        console.log(response);
        setHostedEvents(response.data.myEvents); // Ensure you're accessing `myEvents` correctly from response
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHostedEvents();
  }, [endpoint]);

  return { hostedEvents, isLoading, error };
}

export function useGetBookedEvents(endpoint) {
  console.log(endpoint);
  try {
    const [bookedEvents, setBookedEvents] = useState([]);
    const [isBookedLoading, setIsBookedLoading] = useState(true);
    const [errorBooked, setErrorBooked] = useState(null);
    useEffect(() => {
      const fetchBookedEvents = async () => {
        // Ensure endpoint exists before making API call
        if (!endpoint) {
          setIsBookedLoading(false);
          return;
        }

        try {
          const response = await axios.get(
            `https://sql-be-test.onrender.com${endpoint}`
          );
          console.log(response);
          setBookedEvents(response.data.userBookedEvents); // Ensure you're accessing `myEvents` correctly from response
        } catch (error) {
          setErrorBooked(error);
        } finally {
          setIsBookedLoading(false);
        }
      };

      fetchBookedEvents();
    }, [endpoint]);
    return { bookedEvents, isBookedLoading, errorBooked };
  } catch (error) {
    console.log(error);
  }
}
