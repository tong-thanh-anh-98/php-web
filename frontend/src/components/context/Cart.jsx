import { createContext, useEffect, useState } from "react";
import { apiUrlFront, userToken } from "../common/http";
import { toast } from "react-toastify";
import { parseCurrency } from "../../utils/currency";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(() => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    });

    const [shippingCost, getShippingCost] = useState(0);

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

    useEffect(() => {
        const fetchShipping = async () => {
            try {
                const response = await fetch(`${apiUrlFront}/get-shipping-front`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken()}`
                    }
                });

                const result = await response.json();
                if (result.status === 200) {
                    getShippingCost(parseCurrency(result.data.shipping_charge));
                } else {
                    getShippingCost(0);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error('Unable to connect to the server.');
            }
        };

        fetchShipping();
    }, []);

    // .map() is not designed to sum values. .reduce() is the standard way to sum or accumulate values. So replace .map() with .reduce() as follows.

    // const shipping = () => {
    //     let shippingAmount = 0;
    //     cartData.map(item => {
    //         shippingAmount += item.qty * shippingCost;
    //     });
    //     return shippingAmount;
    // }

    // .map() không được thiết kế để tính tổng .reduce() mới là phương pháp chuẩn để tính tổng hoặc tích lũy giá trị. Vậy nên thay .map() thành .reduce() như sau.
    // 1. Khai báo biến,
    // 2. Dùng .reduce() để gán giá trị,
    // 3. return kết quả cuối cùng,

    // tính phí ship theo số lượng sản phẩm.
    // reduce((total, item) => ...) là cách tích lũy total qua từng item.
    // 0 là giá trị khởi tạo ban đầu cho total.
    // const shipping = () => {
    //     const shippingAmount = cartData.reduce((total, item) => {
    //         return total + (item.qty * shippingCost);
    //     }, 0);

    //     return shippingAmount;
    // };

    // tính phí ship mặc định nếu có sản phẩm.
    const shipping = () => {
        if (cartData.length > 0) {
            return shippingCost;
        }

        return 0;
    };

    // const subTotal = () => {
    //     let subTotal = 0;
    //     cartData.map(item => {
    //         const price = parseCurrency(item.price);
    //         subTotal += item.qty * price;
    //     });

    //     return subTotal;
    // }

    // reduce((total, item) => ...) là cách tích lũy total qua từng item.
    // 0 là giá trị khởi tạo ban đầu cho total.
    const subTotal = () => {
        const totalPrice = cartData.reduce((total, item) => {
            const price = parseCurrency(item.price);
            return total + (item.qty * price);
        }, 0);

        return totalPrice;
    };

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

    // const getQty = () => {
    //     let qty = 0;
    //     cartData.map(item => {
    //         qty += parseInt(item.qty)
    //     });
    //     return qty;
    // }

    // reduce((total, item) => ...) là cách tích lũy total qua từng item.
    // 0 là giá trị khởi tạo ban đầu cho total.
    const getQty = () => {
        const totalQty = cartData.reduce((total, item) => {
            return total + parseInt(item.qty);
        }, 0);

        return totalQty;
    };

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