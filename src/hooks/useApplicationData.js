import React, {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {} 
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      
    })
  }, [])

  //updates days arr on partucular day spot change on delete/add interview
  const changeSpots = (id, action) => {

    let spot = 0;
    if (action === "add") spot--;
    else spot++;

    const days = state.days.map(day => {

      if (day.appointments.includes(id)) {
        return {...day, spots: day.spots += spot}
      }
      return day
    })
    
    return days;
  }

// add interview appointment 
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id} `, appointment)
      .then(() => {
        const days = changeSpots(id, 'add')
        setState({
          ...state,
          appointments,
          days
          
        })
        }
      )
  }

  // delete interview appointment from db
  function cancelInterview(id) {
    
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(`/api/appointments/${id} `, appointment)
      .then((res) => {
        const days = changeSpots(id, 'delete')
        setState({
          ...state,
          appointments,
          days
        })
        }
      )
  }

  return {state,
    setDay,
    bookInterview,
    cancelInterview}

}