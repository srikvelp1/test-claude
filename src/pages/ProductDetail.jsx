import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, Share2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import ProductReviews from '../components/ProductReviews';
import RelatedProducts from '../components/RelatedProducts';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation.',
    rating: 4.5,
    reviews: 128,
    colors: ['Black', 'White', 'Blue'],
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    features: [
      'Active Noise Cancellation',
      'Bluetooth 5.0',
      '30-hour battery life',
      'Quick charging'
    ],
    inStock: true,
    specifications: {
      'Battery Life': '30 hours',
      'Bluetooth Version': '5.0',
      'Charging Time': '2 hours',
      'Weight': '250g'
    }
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    description: 'Feature-rich smartwatch with health tracking.',
    rating: 4.2,
    reviews: 89,
    colors: ['Black', 'Silver', 'Rose Gold'],
    images: [
      '/api/placeholder/400/400',
      '/api/placeholder/400/400',
      '/api/placeholder/400/400'
    ],
    features: [
      'Heart Rate Monitoring',
      'Sleep Tracking',
      'Water Resistant',
      'GPS Enabled'
    ],
    inStock: true,
    specifications: {
      'Battery Life': '48 hours',
      'Display': 'AMOLED',
      'Water Resistance': '5 ATM',
      'Weight': '45g'
    }
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [selectedColor, setSelectedColor] = useState('');
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishListed, setIsWishListed] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="mt-4 text-blue-500 hover:text-blue-600"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.colors && !selectedColor) {
      showNotification('Please select a color', 'error');
      return;
    }
    addToCart({
      ...product,
      selectedColor,
      quantity
    });
    showNotification(`${product.name} added to cart!`, 'success');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch (error) {
      showNotification('Your browser does not support sharing', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate('/shop')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Shop
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="mb-4 aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[mainImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(idx)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                  mainImage === idx ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img 
                  src={img} 
                  alt={`${product.name} ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-5 h-5 ${
                      idx < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.reviews} reviews</span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-3xl font-bold text-gray-900">${product.price}</p>
            <p className={`mt-2 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Color Selection */}
          {product.colors && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Color</h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color 
                        ? 'border-blue-500' 
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Quantity</h3>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-md px-4 py-2"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 
                disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => setIsWishListed(!isWishListed)}
              className={`p-3 border rounded-lg hover:bg-gray-50 ${
                isWishListed ? 'text-red-500' : ''
              }`}
            >
              <Heart className={`w-6 h-6 ${isWishListed ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={handleShare}
              className="p-3 border rounded-lg hover:bg-gray-50"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          {/* Product Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm text-gray-600">{key}</dt>
                  <dd className="text-sm font-medium text-gray-900">{value}</dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ProductReviews productId={product.id} />

      {/* Related Products Section */}
      <RelatedProducts 
        currentProductId={product.id} 
        category={product.category} 
      />
    </div>
  );
};

export default ProductDetail;