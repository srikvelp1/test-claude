import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const allProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation.',
    rating: 4.5,
    reviews: 128,
    image: '/api/placeholder/400/400',
    inStock: true
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    description: 'Feature-rich smartwatch with health tracking.',
    rating: 4.2,
    reviews: 89,
    image: '/api/placeholder/400/400',
    inStock: true
  },
  {
    id: 3,
    name: 'Casual T-Shirt',
    price: 24.99,
    category: 'Clothing',
    description: 'Comfortable cotton t-shirt, perfect for daily wear.',
    rating: 4.0,
    reviews: 156,
    image: '/api/placeholder/400/400',
    inStock: true
  },
  {
    id: 4,
    name: 'Plant Pot Set',
    price: 34.99,
    category: 'Home & Garden',
    description: 'Set of 3 decorative ceramic plant pots.',
    rating: 4.8,
    reviews: 73,
    image: '/api/placeholder/400/400',
    inStock: false
  }
];

const RelatedProducts = ({ currentProductId, category }) => {
  const relatedProducts = allProducts
    .filter(product => 
      product.category === category && 
      product.id !== currentProductId
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map(product => (
          <Link 
            to={`/product/${product.id}`} 
            key={product.id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold group-hover:text-blue-500">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviews})
                  </span>
                </div>
                <p className="text-red-600 text-xl font-bold mt-2">
                  ${product.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;