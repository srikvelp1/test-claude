import React from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';

const reviews = [
  {
    id: 1,
    user: "John D.",
    rating: 5,
    date: "2024-02-15",
    title: "Excellent product!",
    content: "Really impressed with the quality and features. Would definitely recommend!",
    helpful: 12,
    verified: true
  },
  {
    id: 2,
    user: "Sarah M.",
    rating: 4,
    date: "2024-02-10",
    title: "Good but could be better",
    content: "Overall satisfied with the purchase. The quality is good but there's room for improvement.",
    helpful: 8,
    verified: true
  }
];

const ProductReviews = ({ productId }) => {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      {/* Rating Summary */}
      <div className="flex items-center gap-4 mb-8">
        <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
        <div>
          <div className="flex items-center">
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                className={`w-5 h-5 ${
                  idx < Math.floor(averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-1">
            Based on {reviews.length} reviews
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{review.user}</span>
                {review.verified && (
                  <span className="text-green-600 text-sm">Verified Purchase</span>
                )}
              </div>
              <span className="text-gray-500 text-sm">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-4 h-4 ${
                    idx < review.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <h3 className="font-semibold mb-2">{review.title}</h3>
            <p className="text-gray-600 mb-4">{review.content}</p>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-gray-600 text-sm hover:text-blue-500">
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpful})
              </button>
              <button className="flex items-center gap-1 text-gray-600 text-sm hover:text-red-500">
                <Flag className="w-4 h-4" />
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Button */}
      <button className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
        Write a Review
      </button>
    </div>
  );
};

export default ProductReviews;