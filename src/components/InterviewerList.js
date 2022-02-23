import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  const {interviewers, interviewerID, setInterviewer} = props;

  const interviewersList = interviewers.map(interviewer => (
    <InterviewerListItem 
      key={interviewer.id} 
      setInterviewer={setInterviewer} 
      selected={interviewer.id === interviewerID} 
      {...interviewer} />
  ))

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersList}
      </ul>
    </section>
  );
}