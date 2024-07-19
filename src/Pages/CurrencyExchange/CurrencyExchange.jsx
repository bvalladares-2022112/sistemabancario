import React, { useState, useEffect } from 'react';
import './CurrencyExchange.css';
import { Navbar } from '../../Components/Navbar/Navbar.jsx';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-select';

const CurrencyExchange = () => {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState({ value: 'GTQ', label: 'GTQ (Quetzal Guatemalteco)' });
    const [toCurrency, setToCurrency] = useState({ value: 'USD', label: 'USD (Dólar Estadounidense)' });
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('https://openexchangerates.org/api/currencies.json');
                const currencyDetails = response.data;

                const currencyList = Object.keys(currencyDetails).map(key => ({
                    value: key,
                    label: `${key} (${currencyDetails[key]})`
                }));
                setCurrencies(currencyList);
            } catch (error) {
                console.error('Error fetching currencies:', error);
                toast.error('Error al obtener las monedas.');
            }
        };

        fetchCurrencies();
    }, []);

    useEffect(() => {
        if (amount && fromCurrency && toCurrency) {
            convertCurrency(amount, fromCurrency.value, toCurrency.value);
        }
    }, [amount, fromCurrency, toCurrency]);

    const convertCurrency = async (amount, fromCurrency, toCurrency) => {
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const rate = response.data.rates[toCurrency];
            const converted = (amount * rate).toFixed(2);
            setConvertedAmount(`${toCurrency} ${converted}`);
        } catch (error) {
            console.error('Error converting currency:', error);
            toast.error('Error al convertir la moneda.');
        }
    };

    const handleAmountInput = (e) => {
        const value = e.target.value;
        if (!value || /^[0-9]*\.?[0-9]*$/.test(value)) {
            setAmount(value);
        }
    };

    return (
        <>
            <Navbar />
            <Toaster />
            <div className="exchange-container">
                <h2 className='subtitle-exchange'>Cambio de Moneda</h2>
                <div className="exchange-form">
                    <div className="form-group">
                        <label>Cantidad</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountInput}
                            placeholder="Cantidad"
                            className="exchange-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>De</label>
                        <Select 
                            options={currencies} 
                            value={fromCurrency} 
                            onChange={setFromCurrency} 
                            className="exchange-select" 
                        />
                    </div>
                    <div className="form-group">
                        <label>A</label>
                        <Select 
                            options={currencies} 
                            value={toCurrency} 
                            onChange={setToCurrency} 
                            className="exchange-select" 
                        />
                    </div>
                    {convertedAmount && (
                        <p className="converted-amount">
                            Cantidad Convertida: {convertedAmount}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default CurrencyExchange;
