import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  // set initial state as unified state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {} 
  });

  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    // fetches data from DB via API server
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      // update app state with the data received
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      
    })
  }, [])

  //updates days arr on particular day spot change on delete/add interview
  const updateSpots = (id, action) => {
    // handles add or subtract logic 
    let spot = 0;
    if (action === "add") spot--;
    else spot++;
    // creates new days array with updated spots for appropriate day
    const days = [...state.days].map(day => {

      if (day.appointments.includes(id)) {
        return {...day, spots: day.spots += spot}
      }
      return day
    })
    return days;
    
  }

  // add interview appointment 
  function bookInterview(id, interview) {
    // new or updated state objects
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
        // on creates only (not edits), call update spots to subtract one spot and store new days array
        const days = (state.appointments[id].interview === null) ? updateSpots(id, 'add') : state.days
        
        setState(prev => ({
          ...prev,
          appointments,
          days
        }))
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
        // call update spots to add one spot and store new days array
        const days = (state.appointments[id].interview !== null) ? updateSpots(id, 'delete') : state.days
        
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