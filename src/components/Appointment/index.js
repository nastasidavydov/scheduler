import React from "react";

import "./styles.scss";

export default function Appointment(props) {

  const appointmentMsg = (props.time ? `Appointment at ${props.time}` : "No Appointments")
  return (
    <article className="appointment">{appointmentMsg}</article>
  );
}