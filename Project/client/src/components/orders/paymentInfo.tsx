import React, { useState } from 'react';
import { DelivereePayment } from '../../types/orders';

interface Props {
    pay: DelivereePayment | undefined;
}

const PaymentInfo: React.FC<Props> = ({ pay }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!pay) return null;

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '10px',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onClick={handleToggle}
            >
                <strong>Payout:</strong>
                <span>${pay.totalPay}</span>
                <span style={{ marginLeft: '10px', color: 'blue' }}>{isExpanded ? '▼' : '►'}</span>
            </div>
            {isExpanded && (
                <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Base Amount:</span>
                        <span>${pay.baseAmount.toFixed(2)}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Order Quantity Bonus:</span>
                        <span>x{pay.totalOrderQuantityMultiplier}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Delivery Speed Bonus:</span>
                        <span>x{pay.deliverySpeedMultiplier}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Feedback Rating Bonus:</span>
                        <span>x{pay.feedbackRatingMultiplier}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Order Price Bonus:</span>
                        <span>${pay.orderPriceBonus.toFixed(2)}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span>Night Time Bonus:</span>
                        <span>${pay.nightTimeBonus.toFixed(2)}</span>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingTop: '8px',
                            borderTop: '1px solid #ddd',
                            fontWeight: 600,
                        }}
                    >
                        <span>Total Pay:</span>
                        <span>${pay.totalPay.toFixed(2)}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentInfo;
