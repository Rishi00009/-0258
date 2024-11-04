// App.js
import React from 'react';
import Header from './Header';
import ProductCard from './ProductCard';

import { useProductContext } from './ProductContext';

const App = () => {
    const { products } = useProductContext();

    return (
        <div>
            <Header />
            
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default App;

