import React from "react";
import Select from 'react-select';
import {
    TaskSection,
    CreateTaskSubtitle,
    ExampleContainer
} from './createTask.style';

type Props = {
    onChange: (e: Array<Skill>) => void;
}

type Skill = {
    value: string;
    label: string;
}

const TaskSkills: React.FC<Props> = ({ onChange }) => {
    const options: Array<Skill> = [
        { value: 'logo', label: 'Logo Design' },
        { value: 'java', label: 'Java' },
        { value: 'planning', label: 'Planning' },
        { value: 'database', label: 'Database' },
        { value: 'meeting', label: 'Meeting' }
    ]

    return <TaskSection>
        <CreateTaskSubtitle>Define the required Subskills</CreateTaskSubtitle>
        <Select
            className="skills-selector"
            isMulti
            options={options}
            placeholder="What subskills and expertise are you looking for?"
            onChange={(value) => onChange(value as Array<Skill>)}
        />

        <ExampleContainer>
            For Example : UI Designer, Web developer, Accountant, etc
        </ExampleContainer>
    </TaskSection>
}

export default TaskSkills;
