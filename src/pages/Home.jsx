import React from 'react';

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-gray-600">
          Welcome to our shop! We provide high-quality products with exceptional service.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
        <p className="text-gray-600">
          We offer a wide range of products across multiple categories, with fast shipping
          and excellent customer support.
        </p>
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-bold mb-2">Main Office</h3>
            <p className="text-gray-600">123 Business Street</p>
            <p className="text-gray-600">Suite 100</p>
            <p className="text-gray-600">City, State 12345</p>
            <p className="text-gray-600">Phone: (555) 123-4567</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-bold mb-2">Customer Support</h3>
            <p className="text-gray-600">Email: support@example.com</p>
            <p className="text-gray-600">Phone: (555) 987-6543</p>
            <p className="text-gray-600">Hours: 9AM - 5PM EST</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;