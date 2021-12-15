import React from 'react';
import { OperatorConfig } from '../../types';
import OperatorConfigWrapper, { InputForm, ActionsForm } from './operatorConfigForm.style';
import utils from '../../utilities/utils' 
import { CardHeader } from '../../main.style';

type Props = {
    onSubmit: (operator: OperatorConfig) => void;
}

const OperatorConfigForm: React.FC<Props> = ({ onSubmit }) => {
    const [operator, setOperator] = React.useState<OperatorConfig | null>({
        accountId: '',
        privateKey: '',
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOperator({ ...operator, [name]: value } as OperatorConfig);
    }

    const handleSubmit = () => {
        if (operator) {
            const { isValid, message } = utils.validateOperatorConfig(operator);

            if (!isValid) {
                console.warn(message);
                return;
            }

            onSubmit(operator);
        } else {
            console.warn('Operator is null');
        }

        handleReset();
    }

    const handleReset = () => {
        setOperator({ accountId: '', privateKey: '' } as OperatorConfig);
    }

    return <OperatorConfigWrapper>
        <CardHeader>
            <h1>SET THE OPERATOR</h1>
        </CardHeader>
        <InputForm>
            <input
                type="text"
                name="accountId"
                placeholder="Account ID"
                value={operator?.accountId}
                onChange={handleOnChange}
            />
            <input
                type="text"
                name="privateKey"
                placeholder="Private Key"
                value={operator?.privateKey}
                onChange={handleOnChange}
            />
        </InputForm>
        <ActionsForm>
            <button onClick={() => handleSubmit()}>Submit</button>
            <button onClick={() => handleReset()}>Reset</button>
        </ActionsForm>
    </OperatorConfigWrapper>;
};

export default OperatorConfigForm;
