import React, {useState} from 'react';
import FindTasksWrapper, {
  FindTasksHeader,
  TasksListSection,
  NoTasksFound,
  TasksWrapper
} from './findTasks.style';
import SearchIcon from '../../assets/search-icon.svg';
import LoadingSpinner from '../reusable/LoadingSpinner/LoadingSpinner';
import {Task} from "../../views/TaskManager/TaskManager";
import TaskCard from "../TaskCard/TaskCard";

type Props = {
  tasks: Array<Task>,
  onSearch: (searchTerm: string) => any,
}

type State = {
  search: string;
  isLoading: boolean;
}

const FindTasks: React.FC<Props> = ({tasks, onSearch}) => {
  const [state, setState] = useState<State>({
    search: '',
    isLoading: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      search: e.target.value
    });
  }

  const handleSearch = async (e?: React.MouseEvent<HTMLAnchorElement>) => {
    e && e.preventDefault();

    if (state.search && state.search.length) {
      setState({...state, isLoading: true})

      try {
        const response = await onSearch(state.search);

        if(response) {
          setState({...state, isLoading: false})
        }
      }catch (e) {
        console.error('Operation failed with error: ', e)
        setState({...state, isLoading: false})
      }
    } else {
      console.warn('Search term cannot be empty');
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const tasksList = tasks?.length
    ? <TasksListSection>
      {tasks.map((task: Task, index: number) => <TaskCard key={`task_${index}`} task={task} />)}
    </TasksListSection>
    : <NoTasksFound>
      No tasks found
    </NoTasksFound>


  return <FindTasksWrapper>
    <FindTasksHeader>
      <div>
        <h1>Find Tasks</h1>
      </div>
      <section>
        <input
          type="text"
          placeholder="Task id"
          value={state.search}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <a href="#" onClick={handleSearch}>
          <img src={SearchIcon} alt="Search"/>
        </a>
      </section>
    </FindTasksHeader>

    <TasksWrapper>
      {state.isLoading
        ? <LoadingSpinner/>
        : tasksList
      }
    </TasksWrapper>
  </FindTasksWrapper>
}

export default FindTasks;
