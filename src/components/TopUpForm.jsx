import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import StripePayment from './StripePayment';
import PayPalPayment from './PayPalPayment';

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
    : null;

function TopUpForm() {
    const [amount, setAmount] = useState(10.0);
    const [provider, setProvider] = useState('stripe');
    const [paymentData, setPaymentData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('Environment variables:', import.meta.env);
        if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
            setError('Stripe publishable key is not configured');
        }
        if (!import.meta.env.VITE_PAYPAL_CLIENT_ID) {
            setError('PayPal client ID is not configured');
        }
        if (!import.meta.env.VITE_API_URL) {
            setError('API URL is not configured');
        }
    }, []);

    const handleTopUp = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('jwt_token');
            if (!token) {
                throw new Error('Please log in to continue');
            }
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/top_up`,
                { amount, provider },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPaymentData(response.data); // { payment_id, transaction_id }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to initiate top-up');
        } finally {
            setLoading(false);
        }
    };

    if (!import.meta.env.VITE_API_URL) {
        return <div style={{ color: 'red', textAlign: 'center' }}>Error: API URL not configured in .env</div>;
    }

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Top-Up Account</h2>
            <div>
                <label>
                    Amount (USD):
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        min="1"
                        max="10000"
                        step="0.01"
                        style={{ margin: '10px', width: '100%' }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Payment Provider:
                    <select
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        style={{ margin: '10px', width: '100%' }}
                    >
                        <option value="stripe">Stripe</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </label>
            </div>
            <button
                onClick={handleTopUp}
                disabled={loading || amount < 1 || amount > 10000}
                style={{ margin: '10px', padding: '10px', width: '100%' }}
            >
                {loading ? 'Processing...' : 'Initiate Top-Up'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {paymentData && provider === 'stripe' && stripePromise && (
                <Elements stripe={stripePromise}>
                    <StripePayment
                        clientSecret={paymentData.payment_id}
                        transactionId={paymentData.transaction_id}
                    />
                </Elements>
            )}
            {paymentData && provider === 'paypal' && import.meta.env.VITE_PAYPAL_CLIENT_ID && (
                <PayPalScriptProvider
                    options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID }}
                >
                    <PayPalPayment
                        orderId={paymentData.payment_id}
                        transactionId={paymentData.transaction_id}
                    />
                </PayPalScriptProvider>
            )}
        </div>
    );
}

export default TopUpForm;