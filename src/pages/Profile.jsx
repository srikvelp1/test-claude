import React, { useState } from 'react';
import { User, Package, Settings } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, City, State 12345'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update
    alert('Profile updated successfully!');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${activeTab === 'profile'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'}`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${activeTab === 'orders'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Package className="w-4 h-4" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${activeTab === 'settings'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <p className="text-gray-600">No orders found.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Settings</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates about your orders</p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Configure
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div>
                    <h4 className="font-medium">Password</h4>
                    <p className="text-sm text-gray-600">Change your password</p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;