﻿import { VITE_BASE_URL } from '../constants.ts';
import { PAYMENT_METHODS } from '../types/payment.ts';

const baseUrl = VITE_BASE_URL;

export const ValidatePaymentAPI = async (totalPrice: number, customerId: string, cardNumber: number, paymentMethod: PAYMENT_METHODS): Promise<boolean> => {
    //payment service don't like floats so 39.99 is chanced to 3999
    const price = Math.round(totalPrice.toFixed(2) * 100);

    const response = await fetch(`${baseUrl}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price, customerId, cardNumber, paymentMethod }),
    });

    if (!response.ok) {
        throw new Error('Failed to validate payment');
    }
    return response.status === 200;
};