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
import utils from "../../utilities/utils";

export type HourlyRate = {
  ratePerHour: number,
  hoursPerWeek: number,
  taskDeadline: string
}

export type FixedRate = {
  fixedAmount: number,
  taskDeadline: string
}

type Props = {
  value: {
    type: string,
    applyBefore: string,
    applyBeforeDate: string,
    rates: HourlyRate | FixedRate
  },
  onChange: (e: any) => void
}

function isHourly(payment: HourlyRate | FixedRate): payment is HourlyRate {
  return (payment as HourlyRate).hoursPerWeek !== undefined;
}

const TaskPayment: React.FC<Props> = ({value, onChange}) => {

  const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetState();
    onChange({
      ...value,
      type: e.target.value,
      rates: utils.getInitialPaymentState(e.target.value)
    });
  }

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name} = event.target;

    onChange({
      ...value,
      rates: {
        ...value.rates,
        [name]: event.target.value
      }
    });
  }

  const handleChangeApplyBeforeToggle = (applyBefore: boolean) => {
    onChange({
      ...value,
      applyBefore
    })
  }

  const handleChangeApplyBeforeDate = (date: string) => {
    onChange({
      ...value,
      applyBeforeDate: date
    })
  }

  const resetState = () => {
    onChange({
      type: PAYMENT_TYPES[0].type,
      applyBefore: false,
      applyBeforeDate: '',
      rates: utils.getInitialPaymentState(value.type)
    });
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
            checked={value.type === item.type}
            onChange={handlePaymentTypeChange}
          />
          <span>{item.label}</span>
        </TaskPaymentType>
      })}
    </TaskPaymentWrapper>

    {isHourly(value.rates) ?
      <PaymentTypeOptionsWrapper>
        <TaskPaymentRateInput>
          <span>Rate/hr</span>
          <input
            type="number"
            name="ratePerHour"
            placeholder="Enter price"
            value={value.rates.ratePerHour}
            min={0}
            onChange={handleRateChange}
          />
        </TaskPaymentRateInput>

        <TaskPaymentRateInput>
          <span>Time (Hours)</span>
          <input
            type="number"
            name="hoursPerWeek"
            placeholder="Enter time"
            value={value.rates.hoursPerWeek}
            min={0}
            onChange={handleRateChange}
          />
        </TaskPaymentRateInput>

        <TaskPaymentRateInput>
          <span>Task Duration</span>
          <select
            name="taskDeadline"
            value={value.rates.taskDeadline}
            onChange={handleRateChange}>
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
            value={value.rates.fixedAmount}
            min={0}
            onChange={handleRateChange}
          />
        </TaskPaymentRateInput>
        <TaskPaymentRateInput>
          <span>Task Deadline</span>
          <CustomCalendar
            name="taskDeadline"
            value={value.rates.taskDeadline}
            onChange={handleRateChange}
          />
        </TaskPaymentRateInput>
      </PaymentTypeOptionsWrapper>
    }

    <ApplyBeforeWrapper className="inline">
      <CreateTaskSubtitle small>Apply before</CreateTaskSubtitle>
      <CustomToggle onChange={(e: any) => handleChangeApplyBeforeToggle(e.target.checked)}/>
      <span>Allow for Bidding</span>
    </ApplyBeforeWrapper>

    <CustomCalendar
      label={value.applyBefore ? 'Bid Closes by' : 'Select Date'}
      value={value.applyBeforeDate}
      onChange={(e: any) => handleChangeApplyBeforeDate(e.target.value)}
    />

  </TaskSection>
}

export default TaskPayment;
