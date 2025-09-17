import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

function PayPalPayment({ orderId, transactionId }) {
    const [error, setError] = useState(null);

    return (
        <div style={{ marginTop: '20px' }}>
            <PayPalButtons
                createOrder={() => orderId}
                onApprove={async (data, actions) => {
                    try {
                        const response = await axios.post(
                            `${import.meta.env.VITE_API_URL}/api/paypal/capture`,
                            { order_id: data.orderID, transaction_id },
                            {
                                headers: { 'Content-Type': 'application/json' },
                            }
                        );
                        if (response.status === 200) {
                            window.location.href = `/success?transaction_id=${transactionId}`;
                        }
                    } catch (err) {
                        setError(err.response?.data?.message || 'PayPal capture failed');
                    }
                }}
                onError={(err) => {
                    setError(err.message || 'PayPal payment failed');
                }}
                style={{ layout: 'vertical' }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default PayPalPayment;