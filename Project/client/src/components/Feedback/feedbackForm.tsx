import React, { useState } from 'react';
import { submitFeedback } from '../../api/orders';
import { Order } from '../../types/orders';
import { Typography } from '@mui/material';

interface Props {
    order: Order;
}

const FeedbackForm: React.FC<Props> = ({ order }) => {
    const [feedback, setFeedback] = useState({
        foodRating: 3,
        overallRating: 3,
        deliveryRating: 3,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await submitFeedback(
                order._id,
                feedback.foodRating,
                feedback.overallRating,
                feedback.deliveryRating
            );
            setIsSubmitted(true);
            setError('');
        } catch (error) {
            setError(
                'Failed to submit feedback. Please try again. Error: ' + error
            );
        }
    }

    const StarRating = ({
        value,
        onChange,
    }: {
        value: number;
        onChange: (star: number) => void;
    }) => {
        return (
            <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                        }}
                    >
                        {star <= value ? (
                            <p style={{ color: 'orange', fontSize: '18px' }}>
                                ★
                            </p>
                        ) : (
                            <p style={{ color: 'orange', fontSize: '18px' }}>
                                ☆
                            </p>
                        )}
                    </button>
                ))}
            </div>
        );
    };

    if (isSubmitted) {
        return (
            <div
                style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    padding: '16px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px',
                    border: '1px solid #86efac',
                }}
            >
                Thank you for your feedback! We appreciate your input.
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: '500px',
                margin: '0 auto',
                padding: '24px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
            }}
        >
            <div
                style={{
                    marginBottom: '24px',
                    borderBottom: '1px solid #e5e7eb',
                    paddingBottom: '16px',
                }}
            >
                <h2
                    style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        margin: 0,
                    }}
                >
                    Rate Your Order
                </h2>
            </div>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <label
                            style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography>Food Quality</Typography>
                        </label>
                        <StarRating
                            value={feedback.foodRating}
                            onChange={(value: number) =>
                                setFeedback((prev) => ({
                                    ...prev,
                                    foodRating: value,
                                }))
                            }
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <label
                            style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography>Delivery Service</Typography>
                        </label>
                        <StarRating
                            value={feedback.deliveryRating}
                            onChange={(value: number) =>
                                setFeedback((prev) => ({
                                    ...prev,
                                    deliveryRating: value,
                                }))
                            }
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <label
                            style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography>Overall Experience</Typography>
                        </label>
                        <StarRating
                            value={feedback.overallRating}
                            onChange={(value: number) =>
                                setFeedback((prev) => ({
                                    ...prev,
                                    overallRating: value,
                                }))
                            }
                        />
                    </div>
                </div>

                {error && (
                    <div
                        style={{
                            padding: '12px',
                            backgroundColor: '#fef2f2',
                            borderRadius: '6px',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                        }}
                    >
                        {error}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'background-color 0.2s ease',
                    }}
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
