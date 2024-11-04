// ProductContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from an API
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();

                // Format the fetched data
                const formattedProducts = data.map(item => ({
                    id: item.id,
                    image: item.image,
                    name: item.title,
                    category : item.category,
                    rate : item.rating.rate,
                    count : item.rating.count,
                    description: item.description,
                    price: item.price.toFixed(2),
                    quantity: 0,
                }));
                setProducts(formattedProducts);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    const updateQuantity = (id, quantity) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, quantity } : product
            )
        );
    };

    const removeProduct = (id) => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    };

    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
    const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    return (
        <ProductContext.Provider
            value={{ products, updateQuantity, removeProduct, totalQuantity, totalAmount }}
        >
            {children}
        </ProductContext.Provider>
    );
};
