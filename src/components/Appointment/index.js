import React from "react";

import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";



// declare constants 
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
      .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    transition(DELETING, true)
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));

  }

  function confirm() {
    transition(CONFIRM);
  }

  function edit() {
    transition(EDIT);
  }

  
  return (
    <article className="appointment">
    <Header time={time}/>
    
    {mode === ERROR_SAVE && 
      <Error
        message="Could not save appointment."
        onClose={back}
      />}
    
    {mode === ERROR_DELETE && 
      <Error
        message="Could not cancel appointment."
        onClose={back}
      />}
    
    {mode === EDIT && 
      <Form
        studentName={interview.student}
        interviewerId={interview.interviewer.id}
        interviewers={interviewers}
        onCancel={back}
        onSave={save}
      />
    }
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
        onEdit={edit}
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