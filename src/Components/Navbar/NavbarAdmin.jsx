import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const useLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }
    return (
        <div className="navbar">
            <div className="navbar-top">
                <a className="logo" href="/Innovabank/Principal">InnovaBank</a>
                <div className="nav-items">
                    <a href="/Innovabank/Account">Account</a>
                    <button className="logout-button" onClick={useLogout}>Log out</button>
                </div>
            </div>
            <div className="navbar-bottom">
                <a href="/Innovabank/Transaction">Transactions</a>
                <a href="/InnovaBank/Product">Products</a>
                <a href="/Innovabank/Register">Register account</a>
                <a href="/Innovabank/registerAdmin">Register admin</a>
                <a href="/Innovabank/Favorite">Favorites</a>
                <a href="/Innovabank/CurrencyExchange">Currency exchange</a>
            </div>
        </div>
    );
};
