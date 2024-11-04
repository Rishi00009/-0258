// Header.js
import React from 'react';
import { useProductContext } from './ProductContext';

const Header = () => {
    const { totalQuantity, totalAmount } = useProductContext();

    return (
        <header>
            <div className="head">
            Rishi Product Store
            </div>
            <div className="header-info">
                <p>Total Quantity: {totalQuantity}</p>
                <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            </div>
        </header>
    );
};

export default Header;
