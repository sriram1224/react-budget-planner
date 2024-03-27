import React, { useState } from 'react'
import { createContext } from 'react'

export const BudgetContext = createContext();

export default function Budget(props) {
    const [budget, setBudget] = useState(3000);
    const [remaining, setRemaining] = useState(budget);
    const [spent, setSpent] = useState(0);


  return (
      <BudgetContext.Provider value={{budget,remaining,spent,setBudget,setRemaining,setSpent}}>
        {props.children}
        </BudgetContext.Provider>
  )
}
