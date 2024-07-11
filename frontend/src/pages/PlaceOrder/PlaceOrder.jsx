import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrder = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        PNR: "",
        country: "",
        phone: ""
    });

    const { getTotalCartAmount, placeOrder } = useContext(StoreContext);
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const handlePlaceOrder = () => {
        placeOrder(data);
        toast.success('Your order is placed successfully!');
    };

    useEffect(() => {
        if (getTotalCartAmount() === 0) {
            navigate('/');
        }
    }, [getTotalCartAmount, navigate]);

    return (
        <div className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input
                        type="text"
                        name='firstName'
                        onChange={onChangeHandler}
                        value={data.firstName}
                        placeholder='First name'
                    />
                    <input
                        type="text"
                        name='lastName'
                        onChange={onChangeHandler}
                        value={data.lastName}
                        placeholder='Last name'
                    />
                </div>
                <input
                    type="email"
                    name='email'
                    onChange={onChangeHandler}
                    value={data.email}
                    placeholder='Email address'
                />
                <input
                    type="text"
                    name='PNR'
                    onChange={onChangeHandler}
                    value={data.PNR}
                    placeholder='PNR/BookingRef'
                />
                <input
                    type="text"
                    name='phone'
                    onChange={onChangeHandler}
                    value={data.phone}
                    placeholder='Phone'
                />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>${getTotalCartAmount() === 0 ? 0 : 5}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}</b></div>
                    </div>
                </div>
                <div className="payment-options">
                    <h2>Select Payment Method</h2>
                    <div className="payment-option">
                        <img src={assets.selector_icon} alt="" />
                        <p>COD ( Cash On Delivery )</p>
                    </div>
                    <button onClick={handlePlaceOrder}>PLACE ORDER</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PlaceOrder;
