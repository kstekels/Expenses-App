import { createContext, useReducer } from "react";

const createDate = (date) => {
  return new Date(date);
};

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: createDate("2022-11-01"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 29.99,
    date: createDate("2022-11-01"),
  },
  {
    id: "e3",
    description: "iPad",
    amount: 1229.99,
    date: createDate("2021-11-06"),
  },
  {
    id: "e4",
    description: "MacBook Pro M1",
    amount: 3000.99,
    date: createDate("2022-09-10"),
  },
  {
    id: "e5",
    description: "iPhone 13 Pro Max",
    amount: 1429.01,
    date: createDate("2022-06-13"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispach] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispach({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispach({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispach({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
