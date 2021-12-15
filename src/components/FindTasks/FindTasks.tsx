import { useState } from 'react';
import FindTasksWrapper, {
    FindTasksHeader,
    TasksListSection,
    NoTasksFound,
    TasksWrapper,
    TaskItem
} from './findTasks.style';
import SearchIcon from '../../assets/search-icon.svg';
import LoadingSpinner from '../reusable/LoadingSpinner/LoadingSpinner';

type Task = {
    id: number,
    title: string,
    description: string,
}

type State = {
    search: string;
    isLoading: boolean;
    tasks: Array<Task>;
}

const FindTasks = () => {
    const [state, setState] = useState<State>({
        search: '',
        isLoading: false,
        tasks: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            search: e.target.value
        });
    }

    const handleSearch = (e?: React.MouseEvent<HTMLAnchorElement>) => {
        e && e.preventDefault();

        if (state.search && state.search.length) {
            console.log('Do search with: ', state.search);
            setState({
                ...state,
                isLoading: true
            })


            //TODO: replace with the real search request
            setTimeout(() => {
                setState({
                    ...state,
                    isLoading: false,
                    tasks: [{
                        id: 1,
                        title: 'Task 1',
                        description: 'Description 1'
                    }, {
                        id: 2,
                        title: 'Task 2',
                        description: 'Description 2'
                    }]
                });
            }, 3000);
        } else {
            console.warn('Please enter a search term');
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const tasksList = state.tasks?.length
        ? <TasksListSection>
            {state.tasks.map((task: Task, index: number) => (
                //TODO: replace with a new Task component
                <TaskItem key={`task_${index}`}>
                    <h3>{task.title}</h3>
                    <span>{task.description}</span>
                </TaskItem>
            ))}
        </TasksListSection>
        : <NoTasksFound>
            No tasks found
        </NoTasksFound>


    return <FindTasksWrapper>
        <FindTasksHeader>
            <h1>Find Tasks</h1>
            <section>
                <input
                    type="text"
                    placeholder="Task id"
                    value={state.search}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <a href="#" onClick={handleSearch}>
                    <img src={SearchIcon} alt="Search" />
                </a>
            </section>
        </FindTasksHeader>

        <TasksWrapper>
            {state.isLoading
                ? <LoadingSpinner />
                : tasksList
            }
        </TasksWrapper>
    </FindTasksWrapper>
}

export default FindTasks;