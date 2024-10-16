import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function useSignIn(credentials) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const signIn = async (signInCredentials) => {
    setLoading(true);
    setError(null); // Reset error before trying

    try {
      const response = await axios.post(
        `https://event-planing-project-api.onrender.com/api/sign_in`,
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
      if (error.response.data.msg.code === "auth/invalid-credential") {
        setError("Invalid Credentials");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (error.response.data.msg === "Please verify your email.") {
        setError(
          "Please verify your email. Check your inbox for a verificayion link."
        );
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (error.response.data.msg === "Email and password are required") {
        setError("Email and password are required");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

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
        `https://event-planing-project-api.onrender.com/api/new_user`,
        signUpCredentials
      );

      setUserDataSignUp(loggedUser);
      // Only navigate and reload if sign-up is successful
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 3000);
    } catch (error) {
      // Check if the error message matches
      if (
        error.response &&
        error.response.data.msg === "Email is already in use"
      ) {
        setErrorSignUp("Email is already in use");
        setTimeout(() => {
          setErrorSignUp("");
        }, 3000);
      }
      if (
        error.response &&
        error.response.data.msg === "Looks like some details are missing"
      ) {
        setErrorSignUp("Looks like some details are missing");
        setTimeout(() => {
          setErrorSignUp("");
        }, 3000);
      }
    } finally {
      setLoadingSignUp(false);
    }
  };

  return { signUp, userDataSignUp, loadingSignUp, errorSignUp };
}

export function useGetEvents(endpoint, indexLast, filters) {
  const [eventsData, setEventsData] = useState([]); // Initialize as an empty array
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const fiters = {
  //   city: "Manchester",
  // };
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 1 });
    }
  }, []); // Ensure this happens only on component mount.

  let page_params = searchParams.get("page");
  let sort_by_params = searchParams.get("sort_by");
  let order_params = searchParams.get("sort_order");
  let orderByArray = sort_by_params ? sort_by_params.split(",") : [];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://event-planing-project-api.onrender.com${endpoint}`,
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
              orderBy: orderByArray,
              sortDirection: order_params,
            }, // Pass filters as query params
          }
        );

        if (response && response.data && response.data.events) {
          setEventsData(response.data.events); // Correctly set the data from response
          setAllEvents(response.data.allEvents);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [endpoint, filters, searchParams]);

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
          `https://event-planing-project-api.onrender.com${endpoint}/${event_id}`
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
            `https://event-planing-project-api.onrender.com${endpoint}`,
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
  const navigate = useNavigate();

  useEffect(() => {
    // Only attempt to send the event if event is defined
    if (!event) return;

    const sendEvent = async () => {
      setIsLoading(true); // Set loading to true when the request starts
      try {
        const logger = await axios.post(
          `https://event-planing-project-api.onrender.com${endpoint}`,
          event
        );
        const eventId = logger.data.event_id;
        navigate(`/events/${eventId}/details`);
        window.location.reload();
      } catch (err) {
        setError(err);
        console.error("Error sending event:", err);
      } finally {
        setIsLoading(false); // Set loading to false after the request
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
          `https://event-planing-project-api.onrender.com/api/${event_id}/delete_event`
        );
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
          `https://event-planing-project-api.onrender.com/api/${event_id}/register`
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
          `https://event-planing-project-api.onrender.com${endpoint}`
        );

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
            `https://event-planing-project-api.onrender.com${endpoint}`
          );

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
          `https://event-planing-project-api.onrender.com${endpointCalendar}`
        );

        if (response.data && response.data.calendarURL) {
          setAuthURL(response.data.calendarURL);
        } else {
          console.error("calendarURL is missing in response");
        }
      } catch (error) {
        setErrorAuthURL(error);
        console.error("Error fetching calendar URL:", error);
      } finally {
        setAuthURLLoading(false);
        const retrieveUpdatedUser = await axios.get(
          `https://event-planing-project-api.onrender.com/api/current_user`
        );
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
          `https://event-planing-project-api.onrender.com/api/google_calendar/${eventId}/add_event`
        );

        if (response.data) {
          setEventAddedURL(response.data);

          window.location.reload();
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
