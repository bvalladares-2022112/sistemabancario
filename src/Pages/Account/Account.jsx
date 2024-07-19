import { useState, useEffect, useRef } from 'react';
import './Account.css';
import imgDelete from '../../assets/imgDelete.png';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '../../Components/Navbar/Navbar.jsx';
import { useGetAllAccounts } from '../../shared/hooks/account/useGetAllAccounts.jsx';
import { useCreateAccount } from '../../shared/hooks/account/useCreateAccount.jsx';
import { useDeleteAccount } from '../../shared/hooks/account/useDeleteAccount.jsx';

const Account = () => {
    const { registerAccount, isAdding } = useCreateAccount();
    const { getAccounts, isFetching, getAllAccounts } = useGetAllAccounts();
    const { deleteAccount, isDeleting } = useDeleteAccount();

    const [user, setUser] = useState('');
    const [type, setType] = useState('');
    const [balance, setBalance] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const formRef = useRef(null);

    useEffect(() => {
        getAllAccounts();
    }, []);

    const handleRegisterAccount = async (event) => {
        event.preventDefault();
        const productData = {
            user,
            type,
            balance
        };
        await registerAccount(productData);
        getAllAccounts();
        formRef.current.reset();
        setUser('');
        setType('');
        setBalance('');
        setShowForm(false); // Ocultar el formulario después de agregar la cuenta
    };

    const handleDeleteAccount = async (id) => {
        await deleteAccount(id);
        getAllAccounts();
    };

    const handleCancel = () => {
        setUser('');
        setType('');
        setBalance('');
        setShowForm(false); // Ocultar el formulario al cancelar
    };

    const handleBalanceChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setBalance(value);
        }
    };

    const hasData = user || type || balance;

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleSearch = () => {
        const filteredAccounts = getAccounts.filter(account =>
            account.user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredAccounts;
    };

    return (
        <>
            <Navbar />
            <Toaster />
            <div className="account-summary">
                <h2 className="subtitle-account centered">Your Account</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by user"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>
                {isFetching ? (
                    <div>Cargando...</div>
                ) : (
                    handleSearch().length > 0 ? (
                        <div className="account-table-container">
                            <table className="account-table centered-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Type</th>
                                        <th>Balance</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {handleSearch().map((account, index) => {
                                        const accountKey = account._id || index;
                                        return (
                                            <tr key={accountKey}>
                                                <td>{account.user.name}</td>
                                                <td>{account.type}</td>
                                                <td>Q{account.balance}</td>
                                                <td>
                                                    <img
                                                        src={imgDelete}
                                                        alt="Delete"
                                                        className="delete-icon"
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteAccount(account._id); }}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>No accounts found.</div>
                    )
                )}
            </div>
            <button onClick={toggleForm} className="toggle-form-button">
                {showForm ? 'Hide Form' : 'Add Account'}
            </button>
            {showForm && (
                <div className="account-container">
                    <h2 className='subtitle-account centered'>Account</h2>
                    <div className="account-form">
                        <form ref={formRef} onSubmit={handleRegisterAccount}>
                            <label>
                                User
                                <input
                                    type="text"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    placeholder="Id"
                                    style={{ marginTop: '20px' }} // Separar del título
                                />
                            </label>
                            <label>
                                Type
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    placeholder="Select account type"
                                >
                                    <option value="" disabled>Select account type</option>
                                    <option value="Savings account">Savings account</option>
                                    <option value="Monetary Account">Monetary Account</option>
                                </select>
                            </label>
                            <label>
                                Balance
                                <input
                                    type="text"
                                    value={balance}
                                    onChange={handleBalanceChange}
                                    placeholder="0.00"
                                />
                            </label>
                            <button type='submit' disabled={isAdding}>Make an account</button>
                            {hasData && (
                                <button type='button' onClick={handleCancel} className='cancel-button'>Cancel</button>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Account;
