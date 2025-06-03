import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(() => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    });

    const addToCart = (product, size = null) => {
        const existingItem = cartData.find(
            item => item.product_id === product.id && item.size === size
        );

        let updatedCart;

        if (existingItem) {
            updatedCart = cartData.map(item =>
                item.product_id === product.id && item.size === size
                    ? { ...item, qty: item.qty + 1 }
                    : item
            );
        } else {
            const newItem = {
                id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                product_id: product.id,
                size: size,
                title: product.title,
                price: product.price,
                qty: 1,
                image_url: product.image_url
            };
            updatedCart = [...cartData, newItem];
        }

        setCartData(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const shipping = () => {
        return 0;
    }

    const subTotal = () => {
        let subTotal = 0;
        cartData.map(item => {
            const priceNumber = parseInt(
                String(item.price).replace(/[^\d]/g, '') // remove . and ₫ etc
            );
            subTotal += item.qty * priceNumber;
        });
        return subTotal;
    }

    // const subTotal = () => {
    //     return cartData.reduce((total, item) => {
    //         // If item.price is a number, use it directly, if string then filter the number
    //         let priceNumber = 0;
    //         if (typeof item.price === 'number') {
    //             priceNumber = item.price;
    //         } else if (typeof item.price === 'string') {
    //             const digits = item.price.replace(/[^\d]/g, '');
    //             priceNumber = digits ? parseInt(digits, 10) : 0;
    //         }
    //         return total + item.qty * priceNumber;
    //     }, 0);
    // }

    const grandTotal = () => {
        return subTotal() + shipping();
    }

    const updateCartItem = (itemId, newQty) => {
        let updatedCart = [...cartData];
        updatedCart = updatedCart.map(item =>
            (item.id === itemId) ? { ...item, qty: newQty } : item
        );
        setCartData(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const deleteCartItem = (itemId) => {
        const newCartData = cartData.filter(item => item.id !== itemId);
        setCartData(newCartData);
        localStorage.setItem('cart', JSON.stringify(newCartData));
    }

    const getQty = () => {
        let qty = 0;
        cartData.map(item => {
            qty += parseInt(item.qty)
        });

        return qty;
    }

    const clearCart = () => {
        setCartData([]);
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{ addToCart, cartData, shipping, subTotal, grandTotal, updateCartItem, deleteCartItem, getQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};