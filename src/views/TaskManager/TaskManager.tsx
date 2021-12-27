import React from 'react';
import {CardHeader, Icon} from '../../main.style';
import TaskManagerWrapper from './taskManager.style';
import TabbedContent from '../../components/reusable/TabbedContent/TabbedContent';
import CreateTask from '../../components/CreateTask/CreateTask';
import FindTasks from '../../components/FindTasks/FindTasks';
import PlusIcon from '../../assets/plus-icon.svg';
import SearchIcon from '../../assets/search-icon.svg';
import {ApiSession} from "hedera-api";
import {Hbar} from '@hashgraph/sdk'
import utils from "../../utilities/utils";
import {NO_OF_TASKS_PER_REGISTRY} from "../../utilities/constants";
import {BigNumber} from 'bignumber.js';

type Props = {
  hapiSession: ApiSession,
  contract: any
}

export type Task = {
  id: number,
  title: string,
  description: string,
}

type State = {
  tasksList: Array<Task>
}

const TaskManager: React.FC<Props> = ({hapiSession, contract}) => {
  const [state, setState] = React.useState<State>({
    tasksList: []
  });

  const handleCreateTask = async (taskData: any) => {
    const isSpaceAvailable = await contract.isSpaceAvailable();

    if (!isSpaceAvailable)
      throw 'The current registry is full';

    const noOfTasksInRegistry = await contract.getNoOfTasksInRegistry();

    if (!noOfTasksInRegistry)
      throw 'Cannot get the total number of tasks';

    const publicTaskData = await hapiSession.upload(taskData);
    const taskId = new BigNumber(parseInt(noOfTasksInRegistry.toString()) + 1)
    const ploc = utils.stringToBytes(publicTaskData.id.toString(), 32);
    const rate = parseInt(taskData.payment.value.rate);
    const ttl = utils.getSecondsFromDate(taskData.payment.applyBeforeDate);
    const taskType = parseInt(taskData.payment.type);
    const hcount = parseInt(taskData.payment.value.hCount);

    return await contract.initializeTask({gas: 300000},
      taskId,
      rate,
      ploc,
      ttl,
      taskType,
      hcount
    )
  }

  const handleSearchTasks = async (searchTerm: string) => {
    const taskId = new BigNumber(parseInt(searchTerm));
    const task = await contract.getTask({queryPayment: new Hbar(10)}, taskId);

    console.log({
      task,
      price: task.price.toString(),
    })

    const publicTaskData = await hapiSession.getLiveJson({id: "0.0.26056386"})
    console.log(publicTaskData)

    return task;
  }

  const getLabel = (text: string, iconSrc: string) => {
    return <React.Fragment>
      <Icon src={iconSrc}/>
      <span>{text}</span>
    </React.Fragment>
  }

  const Tabs = [
    {
      label: getLabel("Create Task", PlusIcon),
      content: <CreateTask onCreateTask={handleCreateTask}/>
    },
    {
      label: getLabel("Find Tasks", SearchIcon),
      content: <FindTasks tasks={state.tasksList} onSearch={handleSearchTasks}/>
    }
  ]

  return <TaskManagerWrapper>
    <CardHeader>
      <h1>Task Manager</h1>
    </CardHeader>
    <TabbedContent tabs={Tabs}/>
  </TaskManagerWrapper>
}

export default TaskManager;
