import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

  // const appointmentMsg = (props.time ? `Appointment at ${props.time}` : "No Appointments")
  return (
    <article className="appointment">{/*appointmentMsg*/}
    <Header time={props.time}/>
    {(props.interview ? <Show/> : <Empty/>)}
    </article>
  );
}