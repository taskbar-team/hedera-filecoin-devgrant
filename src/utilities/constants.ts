export const NO_OF_TASKS_PER_REGISTRY = 10;
export const DEPLOYED_CONTRACT_KEY = 'deployedContract'
export const PAYMENT_TYPES = [
  {
    index: 1,
    type: 'hourly',
    label: "Hourly",
    value: {
      ratePerHour: 0,
      hoursPerWeek: 0,
      taskDeadline: ""
    }
  },
  {
    index: 2,
    type: 'fixed',
    label: "Fixed price",
    value: {
      fixedAmount: 0,
      taskDeadline: ""
    }
  }
]
