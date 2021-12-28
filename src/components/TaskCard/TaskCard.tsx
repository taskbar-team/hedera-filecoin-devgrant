import React from "react";
import TaskCardWrapper, {
  TaskTopWrapper,
  SkillsWrapper,
  SkillPill,
  TaskBottomWrapper
} from "./taskCard.style";
import {Task} from "../../views/TaskManager/TaskManager";
import TimerIcon from '@mui/icons-material/Timer';
import utils from "../../utilities/utils";

type Props = {
  task: Task
}

const TaskCard: React.FC<Props> = ({task}) => {
  const {title, description, requiredSkills, expiry} = task;
  const remainingDays = expiry ? utils.convertExpiryToDays(expiry) : 'NaN';
  const duration = task.payment.value.taskDuration;

  return <TaskCardWrapper>
    <TaskTopWrapper>
      <h3>{title}</h3>
      <span>{description}</span>
    </TaskTopWrapper>
    <SkillsWrapper>
      {requiredSkills.map((skill, index) => <SkillPill key={`skill_${index}`}>{skill.label}</SkillPill>)}
    </SkillsWrapper>
    <TaskBottomWrapper>
      <div className="left-section">
        <div className="duration">
          <span>Duration</span>
          <h4>{duration}</h4>
        </div>
      </div>
      <div className="right-section">
        <div className="bid-closes">
          <span>Bid Closes in</span>
          <div className="inline">
            <TimerIcon className="timer-icon"/><h4>in {remainingDays} days</h4>
          </div>
        </div>
        <div className="actions">
          <button>Bid Now</button>
        </div>
      </div>
    </TaskBottomWrapper>
  </TaskCardWrapper>
}

export default TaskCard;
