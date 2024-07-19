import React, { useState } from 'react';
import './Deposit.css';
import { Navbar } from '../../Components/Navbar/Navbar.jsx';
import toast, { Toaster } from 'react-hot-toast';

const Deposit = () => {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [originAccount, setOriginAccount] = useState('');
    const [deposits, setDeposits] = useState([]);

    const handleDeposit = () => {
        const newDeposit = { date, amount, originAccount };
        setDeposits([...deposits, newDeposit]);
        toast.success('Deposit added successfully!', { position: 'bottom-right' });

        // Clear the input fields
        setDate('');
        setAmount('');
        setOriginAccount('');
    };

    const handleAmountInput = (e) => {
        const value = e.target.value;
        if (!value || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setAmount(value);
        }
    };

    const handleCancel = () => {
        // Clear the input fields
        setDate('');
        setAmount('');
        setOriginAccount('');
    };

    const hasData = date || amount || originAccount;

    return (
        <>
            <Navbar />
            <Toaster />
            <h2 className='subtitle-deposit'>Deposit</h2>
            <div className="deposit-container">
                <div className="deposit-form">
                    <label>
                        Date
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            placeholder="Example: 2024-06-20"
                        />
                    </label>
                    <label>
                        Amount
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountInput}
                            placeholder="Amount"
                        />
                    </label>
                    <label>
                        Origin account
                        <input
                            type="text"
                            value={originAccount}
                            onChange={(e) => setOriginAccount(e.target.value)}
                            placeholder="Origin account"
                        />
                    </label>
                    <button onClick={handleDeposit}>Make a deposit</button>
                    {hasData && (
                        <button onClick={handleCancel} className="cancel-button">Cancel</button>
                    )}
                </div>
            </div>
            <h2 className='subtitle-my-deposits'>Mis depósitos</h2>
            <div className="table-container">
                <div className="my-deposits-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Origin Account</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deposits.map((deposit, index) => (
                                <tr key={index}>
                                    <td>{deposit.date}</td>
                                    <td>{deposit.amount}</td>
                                    <td>{deposit.originAccount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Deposit;
