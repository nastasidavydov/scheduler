import React from "react";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

import PropTypes from "prop-types"

export default function InterviewerList(props) {

  const {interviewers, value, onChange} = props;

  const interviewersList = interviewers.map(interviewer => (
    <InterviewerListItem 
      key={interviewer.id} 
      setInterviewer={() => onChange(interviewer.id)} 
      selected={interviewer.id === value} 
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};