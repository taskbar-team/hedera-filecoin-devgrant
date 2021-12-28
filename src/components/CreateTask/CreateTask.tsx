import React, {useState} from 'react';
import TaskTitle from './TaskTitle';
import TaskDescription from './TaskDescription';
import TaskSkills, {Skill} from './TaskSkills';
import TaskPayment from './TaskPayment';
import CreateTaskWrapper, {
  CreateTaskHeader,
  ActionsContainer,
  CreateTaskButton
} from './createTask.style';
import LoadingSpinner from "../reusable/LoadingSpinner/LoadingSpinner";
import {PAYMENT_TYPES} from "../../utilities/constants";
import utils from "../../utilities/utils";

type Props = {
  onCreateTask: (taskData: any) => any;
}

type TaskData = {
  title: string,
  description: string,
  requiredSkills: Array<Skill>,
  payment: any
}

const initialState = {
  title: '',
  description: '',
  requiredSkills: [],
  payment: {
    type: PAYMENT_TYPES[0].type,
    applyBefore: false,
    applyBeforeDate: '',
    rates: utils.getInitialPaymentState(PAYMENT_TYPES[0].type)
  }
}

const CreateTask: React.FC<Props> = ({onCreateTask}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [taskData, setTaskData] = useState<TaskData>(initialState);

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    e.preventDefault();

    const {name, value} = e.target;

    setTaskData({...taskData, [name]: value} as TaskData);
  }

  const handleChangeSkills = (skills: Array<Skill>): void => {
    setTaskData({...taskData, requiredSkills: skills});
  }

  const handleChangePayment = (payment: any): void => {
    setTaskData({...taskData, payment: payment});
  }

  const createTask = async () => {
    setIsLoading(true);

    try {
      const rate = taskData.payment.type === PAYMENT_TYPES[0].type
        ? taskData.payment.rates.ratePerHour
        : taskData.payment.rates.fixedAmount;

      const hCount = taskData.payment.type === PAYMENT_TYPES[0].type
        ? taskData.payment.rates.hoursPerWeek
        : utils.getHoursFromTaskDeadline(new Date(taskData.payment.rates.taskDeadline));


      const data = {
        title: taskData.title,
        description: taskData.description,
        requiredSkills: taskData.requiredSkills,
        payment: {
          applyBeforeDate: taskData.payment.applyBeforeDate,
          type: taskData.payment.type === PAYMENT_TYPES[0].type ? 1 : 2,
          value: {
            taskDuration: taskData.payment.rates.taskDeadline,
            rate,
            hCount,
          }
        }
      }

      await onCreateTask(data);

      //reset the ui state
      setIsLoading(false);
      setTaskData(initialState)
      window.scrollTo(0, 0);
    } catch (e) {
      console.error('Could not create the task. Operation failed with error: ', e)
      setIsLoading(false);
    }
  }

  return <div>
    <CreateTaskHeader>
      <h1>Create New Task</h1>
    </CreateTaskHeader>
    <CreateTaskWrapper>

      <TaskTitle
        value={taskData.title}
        onChange={handleChangeInputs}/>

      <TaskDescription
        value={taskData.description}
        onChange={handleChangeInputs}/>

      <TaskSkills
        value={taskData.requiredSkills}
        onChange={handleChangeSkills}/>

      <TaskPayment
        value={taskData.payment}
        onChange={handleChangePayment}/>

      <ActionsContainer>
        {isLoading
          ? <CreateTaskButton><LoadingSpinner/></CreateTaskButton>
          : <CreateTaskButton
              disabled={taskData === initialState}
              onClick={() => createTask()}
          >Create Task</CreateTaskButton>
        }
      </ActionsContainer>
    </CreateTaskWrapper>
  </div>;
}

export default CreateTask;
