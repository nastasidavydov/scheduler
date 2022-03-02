import React, { useState } from "react";

import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {

  const {studentName, interviewerId, interviewers, onSave, onCancel} = props;

  const [error, setError] = useState("");
  const [student, setStudent] = useState(studentName || "");
  const [interviewer, setInterviewer] = useState(interviewerId || null);


  //clears form values when a user clicks on cancel btn
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  //calls reset and onCancel functions when a user clicks on cancel btn
  const cancel = () => {
    reset();
    onCancel();
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    
    setError("");
    onSave(student, interviewer);
  }

  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={(event) => event.preventDefault()} >
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={(event) => setStudent(event.target.value)}
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList 
       interviewers={interviewers}
       value={interviewer}
       onChange={setInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={() => validate()}>Save</Button>
      </section>
    </section>
  </main>
  );
}