import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const {id, name, avatar, selected, setInterviewer} = props;

  let interviewerClass = classNames(
    "interviewers__item",
    {"interviewers__item--selected": selected}
  )
  
  return (
    <li 
      onClick={() => {setInterviewer(id)}}
      className={interviewerClass}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {selected && name}
    </li>
  );
}