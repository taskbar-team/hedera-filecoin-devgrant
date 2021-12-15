import { useState } from 'react';
import {
    TaskSection,
    CreateTaskSubtitle,
    TaskPaymentWrapper,
    TaskPaymentType,
    PaymentTypeOptionsWrapper,
    TaskPaymentRateInput
} from './createTask.style'
import { PAYMENT_TYPES } from '../../utilities/constants';

type Props = {
    value: any
    onChange: (e: any) => void;
}

type HourlyRate = {
    ratePerHour: number,
    hoursPerWeek: number,
    taskDuration: string | null
}

type FixedRate = {
    fixedAmount: number,
    taskDeadline: string | null
}

type State = {
    hourly: HourlyRate,
    fixed: FixedRate
}

const initialState = {
    hourly: {
        ratePerHour: 0,
        hoursPerWeek: 0,
        taskDuration: null
    },
    fixed: {
        fixedAmount: 0,
        taskDeadline: null
    }
}

const TaskPayment: React.FC<Props> = ({ value, onChange }) => {
    const [paymentType, setPaymentType] = useState(PAYMENT_TYPES[0].type);
    const [state, setState] = useState<State>(initialState);

    const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        resetState();
        setPaymentType(e.target.value);
    }

    const handleRateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        const prevPayment = paymentType === PAYMENT_TYPES[0].type
            ? state.hourly
            : state.fixed;

        const newState = {
            ...state,
            [paymentType]: {
                ...prevPayment,
                [name]: value
            }
        }
        setState(newState);
        onChange(newState);
    }

    const resetState = () => {
        setState(initialState);
    }

    return <TaskSection>
        <CreateTaskSubtitle>Payment Terms</CreateTaskSubtitle>
        <CreateTaskSubtitle small>Select the contract type</CreateTaskSubtitle>
        <TaskPaymentWrapper>
            {PAYMENT_TYPES.map((item, index) => {
                return <TaskPaymentType key={`payment_type_${index}`}>
                    <input
                        type="radio"
                        value={item.type}
                        checked={paymentType === item.type}
                        onChange={handlePaymentTypeChange}
                    />
                    <span>{item.label}</span>
                </TaskPaymentType>
            })}
        </TaskPaymentWrapper>
        {paymentType === PAYMENT_TYPES[0].type ?
            <PaymentTypeOptionsWrapper>
                <TaskPaymentRateInput>
                    <span>Rate/hr</span>
                    <input
                        type="number"
                        name="ratePerHour"
                        placeholder="Enter price"
                        value={state.hourly.ratePerHour}
                        onChange={handleRateChange}
                    />
                </TaskPaymentRateInput>

                <TaskPaymentRateInput>
                    <span>Time (Hours)</span>
                    <input
                        type="number"
                        name="hoursPerWeek"
                        placeholder="Enter time"
                        value={state.hourly.hoursPerWeek}
                        onChange={handleRateChange}
                    />
                </TaskPaymentRateInput>

                <TaskPaymentRateInput>
                    <span>Task Duration</span>
                    <select name="taskDuration" onChange={handleRateChange}>
                        <option>Select duration</option>
                        <option>Less than month</option>
                        <option>1 - 3 months</option>
                        <option>3 - 6 months</option>
                        <option>More than 6 months</option>
                    </select>
                </TaskPaymentRateInput>
            </PaymentTypeOptionsWrapper>
            :
            <PaymentTypeOptionsWrapper>
                <TaskPaymentRateInput>
                    <span>Fixed Amount</span>
                    <input
                        type="number"
                        name="fixedAmount"
                        value={state.fixed.fixedAmount}
                        onChange={handleRateChange}
                    />
                </TaskPaymentRateInput>
            </PaymentTypeOptionsWrapper>
        }
    </TaskSection>
}

export default TaskPayment;