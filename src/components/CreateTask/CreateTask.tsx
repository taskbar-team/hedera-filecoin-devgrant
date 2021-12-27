import React, {useState} from 'react';
import TaskTitle from './TaskTitle';
import TaskDescription from './TaskDescription';
import TaskSkills from './TaskSkills';
import TaskPayment from './TaskPayment';
import CreateTaskWrapper, {
  CreateTaskHeader,
  ActionsContainer,
  CreateTaskButton
} from './createTask.style';
import LoadingSpinner from "../reusable/LoadingSpinner/LoadingSpinner";

type Props = {
  onCreateTask: (taskData: any) => any;
}

type TaskData = {
  title: string,
  description: string,
  requiredSkills: string | null,
  payment: any
}

const CreateTask: React.FC<Props> = ({onCreateTask}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [taskData, setTaskData] = useState<TaskData>({
    title: '',
    description: '',
    requiredSkills: null,
    payment: null
  });

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    e.preventDefault();

    const {name, value} = e.target;

    setTaskData({...taskData, [name]: value} as TaskData);
  }

  const handleChangeSkills = (skills: any): void => {
    setTaskData({...taskData, requiredSkills: skills});
  }

  const handleChangePayment = (payment: any): void => {
    setTaskData({...taskData, payment: payment});
  }

  const createTask = async () => {
    setIsLoading(true);

    try {
      const response = await onCreateTask(taskData);

      if (response) {
        setIsLoading(false);
      }
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

      <TaskTitle value={taskData.title} onChange={handleChangeInputs}/>
      <TaskDescription value={taskData.description} onChange={handleChangeInputs}/>
      <TaskSkills onChange={handleChangeSkills}/>
      <TaskPayment onChange={handleChangePayment}/>

      <ActionsContainer>
        {isLoading
          ? <CreateTaskButton><LoadingSpinner/></CreateTaskButton>
          : <CreateTaskButton onClick={() => createTask()}>Create Task</CreateTaskButton>
        }
      </ActionsContainer>
    </CreateTaskWrapper>
  </div>;
}

export default CreateTask;
