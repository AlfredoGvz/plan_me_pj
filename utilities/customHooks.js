import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useSignIn(credentials) {
  console.log(credentials);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const signIn = async (signInCredentials) => {
    setLoading(true);
    setError(null); // Reset error before trying

    try {
      const response = await axios.post(
        `https://sql-be-test.onrender.com/api/sign_in`,
        signInCredentials
      );

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response));

      // Set user data in state
      setUserData(response);

      // Navigate to the homepage or wherever you want
      navigate("/");

      // Optionally reload the page to refresh the app state
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error);
      if (error.response.data.msg.code === "auth/invalid-credential")
        setError("Invalid Credentials");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };
  console.log(error);

  return { signIn, loading, error, userData };
}

export function useSignUp(credentials) {
  const [userDataSignUp, setUserDataSignUp] = useState(null);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState(null);

  const navigate = useNavigate();

  const signUp = async (signUpCredentials) => {
    setLoadingSignUp(true);
    setErrorSignUp(null);
    try {
      const loggedUser = await axios.post(
        `https://sql-be-test.onrender.com/api/new_user`,
        signUpCredentials
      );
      console.log(loggedUser);
      setUserDataSignUp(loggedUser);
      navigate("/"); // Redirect after successful login
      window.location.reload();
    } catch (error) {
      console.log("error signin up", error);
      setErrorSignUp(error.response);
    } finally {
      setLoadingSignUp(false); // Stop loading indicator
    }
  };

  return { signUp, userDataSignUp, loadingSignUp, errorSignUp };
}

export function useGetEvents(endpoint, indexLast, filters) {
  const [eventsData, setEventsData] = useState([]); // Initialize as an empty array
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fiters = {
    city: "Manchester",
  };
  const [searchParams, setSearchParams] = useSearchParams();

  if (!searchParams.get("page")) {
    setSearchParams({ page: 1 });
  }

  let page_params = searchParams.get("page");
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://sql-be-test.onrender.com${endpoint}`,
          {
            params: {
              organizer_id: "",
              organizer_name: "",
              start_time: "",
              end_time: "",
              date: "",
              price: "",
              post_code: "",
              city: "",
              page: page_params || 1,
            }, // Pass filters as query params
          }
        );

        if (response && response.data && response.data.events) {
          setEventsData(response.data.events); // Correctly set the data from response
          setAllEvents(response.data.allEvenst);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [endpoint, filters]);

  return { eventsData, allEvents, isLoading, error };
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

export function useActivateCalendar(endpointCalendar) {
  const [authURL, setAuthURL] = useState(null);
  const [authURLLoading, setAuthURLLoading] = useState(true);
  const [errorAuthURL, setErrorAuthURL] = useState(null);

  useEffect(() => {
    if (!endpointCalendar) {
      setAuthURLLoading(false);
      return;
    }

    const fetchAuthURL = async () => {
      try {
        const response = await axios.get(
          `https://sql-be-test.onrender.com${endpointCalendar}`
        );
        console.log("Response data:", response.data); // Log full response
        if (response.data && response.data.calendarURL) {
          setAuthURL(response.data.calendarURL);
          console.log("Calendar URL:", response.data.calendarURL); // Log the calendarURL to verify it's correct
        } else {
          console.error("calendarURL is missing in response");
        }
      } catch (error) {
        setErrorAuthURL(error);
        console.error("Error fetching calendar URL:", error);
      } finally {
        setAuthURLLoading(false);
        const retrieveUpdatedUser = await axios.get(
          `https://sql-be-test.onrender.com/api/current_user`
        );
        console.log(retrieveUpdatedUser.data);
      }
    };

    setAuthURLLoading(true);
    fetchAuthURL();
  }, [endpointCalendar]);

  return { authURL, authURLLoading, errorAuthURL };
}

export function useAddToGoogleCalendar(eventId) {
  const [eventAddedURL, setEventAddedURL] = useState(null);
  const [sendToCalendarLoading, setSendToCalendarLoading] = useState(true);
  const [errorAuthURL, setErrorAuthURL] = useState(null);

  useEffect(() => {
    if (!eventId) {
      setSendToCalendarLoading(false);
      return;
    }

    const addEventToCalendar = async () => {
      try {
        const response = await axios.get(
          `https://sql-be-test.onrender.com/api/google_calendar/${eventId}/add_event`
        );
        console.log("Response data:", response); // Log full response
        if (response.data) {
          setEventAddedURL(response.data);
          console.log("Calendar URL:", response.data); // Log the calendarURL to verify it's correct
        } else {
          console.error("calendarURL is missing in response");
        }
      } catch (error) {
        setErrorAuthURL(error);
        console.error("Error fetching calendar URL:", error);
      } finally {
        setSendToCalendarLoading(false);
      }
    };

    setSendToCalendarLoading(true);
    addEventToCalendar();
  }, [eventId]);

  return { eventAddedURL, sendToCalendarLoading, errorAuthURL };
}
