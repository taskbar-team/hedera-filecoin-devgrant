import {useEffect, useState} from 'react';
import {
  TaskSection,
  CreateTaskSubtitle,
  TaskPaymentWrapper,
  TaskPaymentType,
  PaymentTypeOptionsWrapper,
  TaskPaymentRateInput, ApplyBeforeWrapper
} from './createTask.style'
import {PAYMENT_TYPES} from '../../utilities/constants';
import CustomToggle from "../reusable/CustomToggle/CustomToggle";
import CustomCalendar from "../reusable/CustomCalendar/CustomCalendar";

type Props = {
  onChange: (e: any) => void;
}

type HourlyRate = {
  ratePerHour: number,
  hoursPerWeek: number,
  taskDeadline: string
}

type FixedRate = {
  fixedAmount: number,
  taskDeadline: string
}

function isHourly(payment: HourlyRate | FixedRate): payment is HourlyRate {
  return (payment as HourlyRate).hoursPerWeek !== undefined;
}

const getInitialState = (paymentType: string) => {
  const payment = PAYMENT_TYPES.find(payment => payment.type === paymentType);

  return paymentType === PAYMENT_TYPES[0].type
    ? payment?.value as HourlyRate
    : payment?.value as FixedRate;
}

const TaskPayment: React.FC<Props> = ({onChange}) => {
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPES[0].type);
  const [state, setState] = useState<HourlyRate | FixedRate>(getInitialState(paymentType));
  const [applyBefore, setApplyBefore] = useState(false);
  const [applyBeforeDate, setApplyBeforeDate] = useState('');

  useEffect(() => {
    onChange({
      type: PAYMENT_TYPES.find(payment => payment.type === paymentType)?.index || 1,
      applyBeforeDate,
      value: {
        rate: isHourly(state) ? state.ratePerHour : state.fixedAmount,
        hCount: isHourly(state) ? state.hoursPerWeek : 0,
        taskDuration: state.taskDeadline,
      }
    });
  }, [state, applyBefore, applyBeforeDate])

  const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetState();
    setPaymentType(e.target.value);
    setState(getInitialState(e.target.value));
  }

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setState({
      ...state,
      [name]: value
    });
  }

  const resetState = () => {
    setState(getInitialState(paymentType));
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

    {isHourly(state) ?
      <PaymentTypeOptionsWrapper>
        <TaskPaymentRateInput>
          <span>Rate/hr</span>
          <input
            type="number"
            name="ratePerHour"
            placeholder="Enter price"
            value={state.ratePerHour}
            onChange={handleRateChange}
          />
        </TaskPaymentRateInput>

        <TaskPaymentRateInput>
          <span>Time (Hours)</span>
          <input
            type="number"
            name="hoursPerWeek"
            placeholder="Enter time"
            value={state.hoursPerWeek}
            onChange={handleRateChange}
          />
        </TaskPaymentRateInput>

        <TaskPaymentRateInput>
          <span>Task Duration</span>
          <select name="taskDeadline" onChange={handleRateChange}>
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
            value={state.fixedAmount}
            onChange={handleRateChange}
          />
        </TaskPaymentRateInput>
        <TaskPaymentRateInput>
          <span>Task Deadline</span>
          <CustomCalendar
            name="taskDeadline"
            value={state.taskDeadline}
            onChange={handleRateChange}
          />
        </TaskPaymentRateInput>
      </PaymentTypeOptionsWrapper>
    }

    <ApplyBeforeWrapper className="inline">
      <CreateTaskSubtitle small>Apply before</CreateTaskSubtitle>
      <CustomToggle onChange={(e: any) => setApplyBefore(e.target.checked)}/>
      <span>Allow for Bidding</span>
    </ApplyBeforeWrapper>

    <CustomCalendar
      label={applyBefore ? 'Bid Closes by' : 'Select Date'}
      value={applyBeforeDate}
      onChange={(e: any) => setApplyBeforeDate(e.target.value)}
    />

  </TaskSection>
}

export default TaskPayment;
