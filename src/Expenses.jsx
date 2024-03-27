import React, { useContext, useState, useEffect } from 'react';
import { BudgetContext } from './budget.jsx';
import './Expenses.css';

export default function Expenses() {
    const { budget, remaining, spent, setBudget, setRemaining, setSpent } = useContext(BudgetContext);
    const [expenses, setExpenses] = useState([]);
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [inputError, setInputError] = useState(false);
    const [newbudget, setNewBudget] = useState(0);

    useEffect(() => {
        // Retrieve expenses from local storage on component mount
        const storedExpenses = localStorage.getItem('expenses');
        if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses));
        }

        // Retrieve budget from local storage on component mount
        const storedBudget = localStorage.getItem('budget');
        if (storedBudget) {
            setBudget(parseInt(storedBudget));
        }
    }, []); // Run only once on component mount

    useEffect(() => {
        // Save expenses to local storage whenever it changes
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]); // Run whenever expenses change

    useEffect(() => {
        // Save budget to local storage whenever it changes
        localStorage.setItem('budget', budget);
    }, [budget]); // Run whenever budget changes

    const handleName = (e) => {
        setName(e.target.value);
        setInputError(false);
    };

    const handleCost = (e) => { 
        setCost(parseInt(e.target.value));
        setInputError(false);
    };

    const handleSave = () => {
        if (name.trim() !== '' && cost !== 0) {
            setExpenses([...expenses, { name, cost }]);
            setCost(0);
            setName('');
            setInputError(false);
            setSpent(spent + cost);
            setRemaining(remaining - cost);
        } else {
            setInputError(true);
        }
    };

    const handleBudget = (e) => { 
        setNewBudget(parseInt(e.target.value));
        setBudget(newbudget);
        setRemaining(newbudget);
        setSpent(0);
    };

    const handleDeleteExpense = (index) => {
        const updatedExpenses = [...expenses];
        const deletedExpense = updatedExpenses.splice(index, 1)[0];
        setExpenses(updatedExpenses);
        // Adjust spent and remaining amounts after deleting expense
        setSpent(spent - deletedExpense.cost);
        setRemaining(remaining + deletedExpense.cost);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    return (
        <div className="expenses-container">
            <h1>My Budget Planner</h1>
            <div className="budget-info">
                <div className="budget-details one">
                    <span className="budget-label">Budget:</span>
                    <span className="budget-value">₹ {budget}</span>
                </div>
                <div className="budget-details two">
                    <span className="budget-label">Remaining:</span>
                    <span className="budget-value">₹ {remaining}</span>
                </div>
                <div className="budget-details three">
                    <span className="budget-label">Spent:</span>
                    <span className="budget-value">₹ {spent}</span>
                </div>
            </div>
            <div className="expenses-list">
                <h1>Expenses</h1>
                
                {!expenses.length > 0 && (
                    
                    <div className="msg">
                        
                        <h2 className="add-data-message">Add Data To List . . . . .</h2>
                    </div>
                )}
                {expenses.map((expense, index) => (
                    <div className="expense-item" key={index}>
                        <span className="expense-name">{expense.name}</span>
                        <span className="budget-manager">
                            <span className="expense-cost">₹ {expense.cost}</span>
                            <button className="expense-delete" onClick={() => handleDeleteExpense(index)}>
                                <span className="material-symbols-outlined">cancel</span>
                            </button>
                        </span>
                        
                    </div>
                ))}
            </div>
            <div className="add-expenses">
                <h1>Add Expenses</h1>
                <span className="enter-budget">
                    <label>Enter Budget:</label>
                <input type='number' name='number' onChange={handleBudget} value={newbudget} placeholder='Enter Budget Here' />
                </span>
                <hr />
                <input type='text' name='name' onChange={handleName} value={name} placeholder='Name' />
                <input type='number' name='cost' onChange={handleCost} onKeyDown={handleKeyDown} value={cost} placeholder='Cost' />
                <button onClick={handleSave}>Save</button>
                {inputError && <div className="error-message">!Please enter both name and cost</div>}
            </div>
        </div>
    );
}
