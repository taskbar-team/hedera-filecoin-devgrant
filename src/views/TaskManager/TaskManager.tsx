import React from 'react';
import { CardHeader, Icon } from '../../main.style';
import TaskManagerWrapper from './taskManager.style';
import TabbedContent from '../../components/reusable/TabbedContent/TabbedContent';
import CreateTask from '../../components/CreateTask/CreateTask'; 
import FindTasks from '../../components/FindTasks/FindTasks';
import PlusIcon from '../../assets/plus-icon.svg';
import SearchIcon from '../../assets/search-icon.svg';

const TaskManager = () => {

    const getLabel = (text: string, iconSrc: string) => {
        return <React.Fragment>
            <Icon src={iconSrc} />
            <span>{text}</span>
        </React.Fragment>
    }

    const Tabs = [
        {
            label: getLabel("Create Task", PlusIcon),
            content: <CreateTask />
        },
        {
            label: getLabel("Find Tasks", SearchIcon),
            content: <FindTasks />
        }
    ]

    return <TaskManagerWrapper>
        <CardHeader>
            <h1>Task Manager</h1>
        </CardHeader> 
        <TabbedContent tabs={Tabs} />
    </TaskManagerWrapper>
}

export default TaskManager;  