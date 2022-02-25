import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

  const {id, time, interview} = props;

  // const appointmentMsg = (props.time ? `Appointment at ${props.time}` : "No Appointments")
  return (
    <article className="appointment">{/*appointmentMsg*/}
    <Header time={time}/>
    {(interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty/>)}
    </article>
  );
}