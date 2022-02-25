
//returns an array of appointments for the given day for tha matching days
  export function getAppointmentsForDay(state, day) {
    let appointments = [];
    
    for (let d of state.days) {
    
      if (d.name === day) {
        d.appointments.forEach((appointmentId) => {
          appointments.push(state.appointments[appointmentId])
        })
      }
    }
  return appointments;
  }

