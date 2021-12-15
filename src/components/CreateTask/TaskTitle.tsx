import {
    TaskSection,
    CreateTaskSubtitle,
    ExampleContainer
} from './createTask.style';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TaskTitle: React.FC<Props> = ({ value, onChange }) => {
    return <TaskSection>
        <CreateTaskSubtitle>Give your task a title</CreateTaskSubtitle>
        <input
            type="text"
            name="title"
            placeholder="Eg. Required a graphic designer for branding"
            value={value || ''}
            onChange={onChange}
        />
        <ExampleContainer>
            <div>See Examples:</div>
            <ul>
                <li>Need a JAVA developer for mobile application</li>
                <li>Required a photo editor for 200 modelling photos to edit</li>
                <li>Flutter developer for android and iOS app</li>
            </ul>
        </ExampleContainer>
    </TaskSection>
}

export default TaskTitle;