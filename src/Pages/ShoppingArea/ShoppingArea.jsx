import React, { useState } from 'react';
import './ShoppingArea.css';
import { Navbar } from '../../Components/Navbar/Navbar.jsx';
import toast, { Toaster } from 'react-hot-toast';

const ShoppingArea = () => {
    const [date, setDate] = useState('');
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState('');
    const [accountId, setAccountId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchases, setPurchases] = useState([
        {
            date: '2024-06-20',
            userId: '60d0fe4f5311236168a109ca',
            productId: '60d0fe4f5311236168a109cb',
            accountId: '60d0fe4f5311236168a109cc',
            quantity: 2
        }
    ]);

    const handlePurchase = () => {
        const newPurchase = { date, userId, productId, accountId, quantity };
        setPurchases([...purchases, newPurchase]);
        toast.success('Purchase added successfully!', { position: 'bottom-right' });

        // Clear the input fields
        setDate('');
        setUserId('');
        setProductId('');
        setAccountId('');
        setQuantity('');
    };

    const handleCancel = () => {
        // Clear the input fields
        setDate('');
        setUserId('');
        setProductId('');
        setAccountId('');
        setQuantity('');
    };

    const hasData = date || userId || productId || accountId || quantity;

    return (
        <>
            <Navbar />
            <Toaster />
            <h2 className='subtitle-shopping'>Shopping Area</h2>
            <div className="shopping-container">
                <div className="shopping-form">
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
                        User ID
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="User ID"
                        />
                    </label>
                    <label>
                        Product ID
                        <input
                            type="text"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            placeholder="Product ID"
                        />
                    </label>
                    <label>
                        Account ID
                        <input
                            type="text"
                            value={accountId}
                            onChange={(e) => setAccountId(e.target.value)}
                            placeholder="Account ID"
                        />
                    </label>
                    <label>
                        Quantity
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Quantity"
                        />
                    </label>
                    <button onClick={handlePurchase}>Make a Purchase</button>
                    {hasData && (
                        <button onClick={handleCancel} className="cancel-button">Cancel</button>
                    )}
                </div>
                <div className="shopping-summary">
                    <h2>Purchases</h2>
                    {purchases.map((purchase, index) => (
                        <div key={index} className="purchase-item">
                            <p><strong>Date</strong><br />{purchase.date}</p>
                            <p><strong>User ID</strong><br />{purchase.userId}</p>
                            <p><strong>Product ID</strong><br />{purchase.productId}</p>
                            <p><strong>Account ID</strong><br />{purchase.accountId}</p>
                            <p><strong>Quantity</strong><br />{purchase.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ShoppingArea;
