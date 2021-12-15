import {
    TaskSection,
    CreateTaskSubtitle
} from './createTask.style';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TaskDescription: React.FC<Props> = ({value, onChange }) => {
    return <TaskSection>
        <CreateTaskSubtitle>Provide a brief description of the task</CreateTaskSubtitle>
        <textarea
            rows={5}
            name="description"
            placeholder="Give a detailed description about the task for maximum reach…"
            value={value || ''}
            onChange={onChange}
        />
    </TaskSection>
}

export default TaskDescription;