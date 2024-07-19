import React, { useState, useEffect, useRef } from 'react';
import './Favorite.css';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '../../Components/Navbar/Navbar.jsx';
import { useGetAllFavorites } from '../../shared/hooks/favorite/useGetAllFavorites.jsx';
import imgDelete from '../../assets/imgDelete.png';
import { useDeleteFavorite } from '../../shared/hooks/favorite/useDeleteFavorite.jsx';
import { useAddFavorite } from '../../shared/hooks/favorite/useAddFavorite.jsx';

const Favorite = () => {
    const { getFavorites, isFetching, getAllFavorites } = useGetAllFavorites();
    const { deleteFavorite, isDeleting } = useDeleteFavorite();
    const { registerFavorite, isAdding } = useAddFavorite();

    const [accountNumber, setAccountNumber] = useState('');
    const [alias, setAlias] = useState('');
    const [DPI, setDPI] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const formRef = useRef(null);

    useEffect(() => {
        getAllFavorites();
    }, []);

    const handleRegisterFavorite = async (event) => {
        event.preventDefault();
        const favoriteData = {
            accountNumber,
            alias,
            DPI,
        };
        await registerFavorite(favoriteData);
        getAllFavorites();
        formRef.current.reset();
        setAccountNumber('');
        setAlias('');
        setDPI('');
        setShowForm(false);
    };

    const handleDeleteFavorite = async (id) => {
        await deleteFavorite(id);
        getAllFavorites();
    };

    const handleCancel = () => {
        setAccountNumber('');
        setAlias('');
        setDPI('');
        setShowForm(false);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleSearch = () => {
        const filteredFavorites = getFavorites.filter(favorite =>
            favorite.alias.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredFavorites;
    };

    return (
        <>
            <Navbar />
            <Toaster />
            <div className="favorite-summary">
                <h2 className="subtitle-favorite centered">Your Favorites</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by alias"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>
                {isFetching ? (
                    <div>Loading...</div>
                ) : (
                    handleSearch().length > 0 ? (
                        <div className="favorite-table-container">
                            <table className="favorite-table centered-table">
                                <thead>
                                    <tr>
                                        <th>Account Number</th>
                                        <th>Alias</th>
                                        <th>DPI</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {handleSearch().map((favorite, index) => {
                                        const favoriteKey = favorite._id || index;
                                        return (
                                            <tr key={favoriteKey}>
                                                <td>{favorite.accountNumber.accountNumber}</td>
                                                <td>{favorite.alias}</td>
                                                <td>{favorite.DPI.DPI}</td>
                                                <td>
                                                    <img
                                                        src={imgDelete}
                                                        alt="Delete"
                                                        className="delete-icon"
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteFavorite(favorite._id); }}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>No favorites found.</div>
                    )
                )}
            </div>
            <button onClick={toggleForm} className="toggle-form-button">
                {showForm ? 'Hide Form' : 'Add Favorite'}
            </button>
            {showForm && (
                <div className="favorite-container">
                    <h2 className='subtitle-favorite centered'>Favorite</h2>
                    <div className="favorite-form">
                        <form ref={formRef} onSubmit={handleRegisterFavorite}>
                            <label>
                                Account Number
                                <input
                                    type="text"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    placeholder="Account Number"
                                />
                            </label>
                            <label>
                                Alias
                                <input
                                    type="text"
                                    value={alias}
                                    onChange={(e) => setAlias(e.target.value)}
                                    placeholder="Alias"
                                />
                            </label>
                            <label>
                                DPI
                                <input
                                    type="text"
                                    value={DPI}
                                    onChange={(e) => setDPI(e.target.value)}
                                    placeholder="DPI"
                                />
                            </label>
                            <button type='submit' disabled={isAdding}>Add Favorite</button>
                            {accountNumber || alias || DPI ? (
                                <button type='button' onClick={handleCancel} className='cancel-button'>Cancel</button>
                            ) : null}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Favorite;
