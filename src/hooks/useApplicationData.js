import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day});
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
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
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      setState({ ...state, appointments});
    });
  };
  
  const cancelInterview = function(id) {
    const appointments = {
      ...state.appointments,
      [id]: {...state.appointments[id], interview: null}
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      setState({ ...state, appointments})
    })
  };

  return { state, setDay, bookInterview, cancelInterview }
};