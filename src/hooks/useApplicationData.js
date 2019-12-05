import axios from "axios";
import { useEffect, useReducer } from "react";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {day: "Monday", days: [], appointments: {}, interviewers: {}});

  const setDay = day => dispatch({type: SET_DAY, day});
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      dispatch({type: SET_APPLICATION_DATA, all});
    });
  }, [])
  
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("bookInterview: ", id, interview);
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({type: SET_INTERVIEW, appointments, value: -1});
      });
  };
  
  const cancelInterview = function(id) {
    const appointments = {
      ...state.appointments,
      [id]: {...state.appointments[id], interview: null}
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({type: SET_INTERVIEW, appointments, value: 1});
      });
  };

  return { state, setDay, bookInterview, cancelInterview }
};