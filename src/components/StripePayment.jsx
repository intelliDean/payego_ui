import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function StripePayment({ clientSecret, transactionId }) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        setError(null);

        if (!stripe || !elements) {
            setError('Stripe.js has not loaded');
            setProcessing(false);
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Test User', // Replace with user data if available
                },
            },
        });

        if (result.error) {
            setError(result.error.message);
            setProcessing(false);
        } else if (result.paymentIntent.status === 'succeeded') {
            window.location.href = `/success?transaction_id=${transactionId}`;
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />
            <button
                type="submit"
                disabled={processing || !stripe || !elements}
                style={{ margin: '10px 0', padding: '10px', width: '100%' }}
            >
                {processing ? 'Processing...' : 'Pay with Stripe'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default StripePayment;