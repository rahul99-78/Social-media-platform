import React, { useState } from 'react';
import axios from 'axios';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
    const postdata = async () => {
    try {
      const response = await axios.post('/api/user/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        username: formData.username
      });
      if (response.data.success) {
        console.log('User created successfully:', response.data.user);
        // Redirect or show success message
      } else {
        console.error('Signup failed:', response.data.message);
        // Show error message to user
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle error, e.g., show error message to User
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await postdata();
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Create Account</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="text-purple-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
