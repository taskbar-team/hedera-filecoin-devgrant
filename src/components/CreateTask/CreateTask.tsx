import { useState } from 'react';
import TaskTitle from './TaskTitle';
import TaskDescription from './TaskDescription';
import TaskSkills from './TaskSkills';
import TaskPayment from './TaskPayment';
import CreateTaskWrapper, {
    CreateTaskHeader,
    ActionsContainer
} from './createTask.style';

type State = {
    title: string,
    description: string,
    requiredSkills: string,
    payment: any,
    applyBefore: any
}

const CreateTask = () => {
    const [state, setState] = useState<State>({
        title: '',
        description: '',
        requiredSkills: '',
        payment: '',
        applyBefore: ''
    });

    const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        e.preventDefault();

        const {name, value} = e.target;

        setState({ ...state, [name]: value } as State);
    }

    const handleChangeSkills = (skills: any): void => {
        setState({ ...state, requiredSkills: skills });
    }

    const handleChangePayment = (payment: any): void => {
        setState({ ...state, payment: payment });
    }

    const createTask = () => {
        console.log('create task with state: ', state);
    }

    return <div>
        <CreateTaskHeader>
            <h1>Create New Task</h1>
        </CreateTaskHeader>
        <CreateTaskWrapper>

            <TaskTitle value={state.title} onChange={handleChangeInputs} />
            <TaskDescription value={state.description} onChange={handleChangeInputs} />
            <TaskSkills value={state.requiredSkills} onChange={handleChangeSkills} />
            <TaskPayment value={state.payment} onChange={handleChangePayment} />

            <ActionsContainer>
                <button onClick={() => createTask()}>Create Task</button>
            </ActionsContainer>
        </CreateTaskWrapper>
    </div>;
}

export default CreateTask;