import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";


// declare constants 
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"

export default function Appointment(props) {

  const {id, time, interview, interviewers, bookInterview, cancelInterview} = props;
  
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
    
  }

  function deleteInterview() {
    transition(DELETING)
    cancelInterview(id)
      .then(() => transition(EMPTY))

  }

  function confirm() {
    transition(CONFIRM);
  }

  
  return (
    <article className="appointment">
    <Header time={time}/>
    
    {mode === CONFIRM && 
      <Confirm 
        message="Are you sure you would like to delete?"
        onConfirm={deleteInterview} 
        onCancel={back}
      />}

    {mode === SAVING && <Status message="Saving"/>}
    {mode === DELETING && <Status message="Deleting"/>}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={interview.student}
        interviewer={interview.interviewer}
        onDelete={confirm}
      />
    )}
    {mode === CREATE && 
    <Form
      interviewers={interviewers} 
      onCancel={() => back(EMPTY)}
      onSave={save}  
    />}

    </article>
  );
}