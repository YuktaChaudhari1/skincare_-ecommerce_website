import React, { useState } from 'react';
import { Trash2, Star } from 'lucide-react';

const Reviews = () => {
    // Mock reviews
    const [reviews, setReviews] = useState([
        { id: 1, customer: 'Eleanor H.', rating: 5, date: 'Oct 25, 2026', comment: 'Simply divine. My skin has never looked better.' },
        { id: 2, customer: 'Sophia L.', rating: 5, date: 'Oct 23, 2026', comment: 'The glow it gives is unmatched. Worth every penny.' },
        { id: 3, customer: 'Unknown', rating: 1, date: 'Oct 22, 2026', comment: 'Spam message link http://spam.com' },
    ]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-serif text-gray-800 mb-8 border-b border-gray-200 pb-4">Customer Reviews</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-medium text-gray-800">{review.customer}</h4>
                                <span className="text-xs text-gray-400">{review.date}</span>
                            </div>
                            <button
                                onClick={() => handleDelete(review.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                title="Delete Review"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className={i < review.rating ? "text-gold fill-gold" : "text-gray-200"} />
                            ))}
                        </div>

                        <p className="text-gray-600 text-sm italic flex-1">"{review.comment}"</p>
                    </div>
                ))}
            </div>

            {reviews.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No reviews found.
                </div>
            )}
        </div>
    );
};
export default Reviews;
