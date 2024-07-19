import React, { useState, useEffect, useRef } from 'react';
import './Transaction.css';
import { Navbar } from '../../Components/Navbar/Navbar.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { useGetAllTransactions } from '../../shared/hooks/transaction/useGetAllTransactions.jsx';
import imgDelete from '../../assets/imgDelete.png'
import { useDeleteTransaction } from '../../shared/hooks/transaction/useDeleteTransaction.jsx'
import { useAddTransaction } from '../../shared/hooks/transaction/useAddTransaction.jsx'

const Transaction = () => {
    const { getTransactions, isFetching, getAllTransactions } = useGetAllTransactions()
    const { deleteTransaction, isDeleting } = useDeleteTransaction()
    const { registerTransaction, isAdding } = useAddTransaction()

    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [originAccount, setOriginAccount] = useState('')
    const [destinationDPI, setDestinationDPI] = useState('')
    const [destinationAccount, setDestinationAccount] = useState('')

    const formRef = useRef(null);

    useEffect(() => {
        getAllTransactions();
    }, []);

    const handleRegisterTransaction = async (event) => {
        event.preventDefault();
        const productData = {
            type,
            amount,
            description,
            originAccount,
            destinationDPI,
            destinationAccount
        };
        await registerTransaction(productData);
        getAllTransactions();
        formRef.current.reset();
        setType('');
        setAmount('');
        setDescription('');
        setOriginAccount('');
        setDestinationDPI('');
        setDestinationAccount('');
    };

    const handleCancel = () => {
        setType('');
        setAmount('');
        setDescription('');
        setOriginAccount('');
        setDestinationDPI('');
        setDestinationAccount('');
    };

    const handleDeleteTransaction = async (id) => {
        await deleteTransaction(id);
        getAllTransactions();
    };

    const hasData = type || amount || description || originAccount || destinationAccount || destinationDPI

    return (
        <>
            <Navbar />
            <Toaster />
            <h2 className='subtitle-transaction'>Transaction</h2>
            <div className="transaction-container">
                <div className="transaction-form">
                    <form ref={formRef} onSubmit={handleRegisterTransaction}>
                        <label>
                            Tipo
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                placeholder="Tipo (e.g., Transferencia, Depósito)"
                            />
                        </label>
                        <label>
                            Monto
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Monto"
                            />
                        </label>
                        <label>
                            Descripción
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descripción"
                            />
                        </label>
                        <label>
                            Cuenta de origen
                            <input
                                type="text"
                                value={originAccount}
                                onChange={(e) => setOriginAccount(e.target.value)}
                                placeholder="Cuenta de origen"
                            />
                        </label>
                        <label>
                            DPI del destinatario
                            <input
                                type="text"
                                value={destinationDPI}
                                onChange={(e) => setDestinationDPI(e.target.value)}
                                placeholder="DPI del destinatario"
                            />
                        </label>
                        <label>
                            Cuenta del destinatario
                            <input
                                type="text"
                                value={destinationAccount}
                                onChange={(e) => setDestinationAccount(e.target.value)}
                                placeholder="Cuenta del destinatario"
                            />
                        </label>
                        <button type='submit' disabled={isAdding}>
                            Make a transaction
                        </button>
                        {hasData && (
                            <button type='button' onClick={handleCancel} className='cancel-button'>Cancel</button>
                        )}
                    </form>
                </div>
            </div>
            <div className="table-container">
                <div className="my-transactions-table">
                    {isFetching ? (
                        <div>Cargando ... </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Monto</th>
                                    <th>Descripción</th>
                                    <th>Cuenta de origen</th>
                                    <th>DPI del destinatario</th>
                                    <th>Cuenta del destinatario</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getTransactions && getTransactions.length > 0 ? (
                                    getTransactions.map((transaction, index) => (
                                        <tr key={transaction._id || index}>
                                            <td>{transaction.type}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{transaction.description}</td>
                                            <td>{transaction.originAccount.accountNumber}</td>
                                            <td>{transaction.destinationDPI}</td>
                                            <td>{transaction.destinationAccount.accountNumber}</td>
                                            <td>
                                                <img
                                                    src={imgDelete}
                                                    alt="Delete"
                                                    className='delete-icon'
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteTransaction(transaction._id) }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No transactions found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Transaction;