import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({ ...errors, [name]: '' });
    setServerError('');
    setSuccessMsg('');
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
        setSuccessMsg('User created successfully!');
        setServerError('');
        setFormData({ username: '', email: '', name: '', password: '' });
      } else {
        setServerError(response.data.message || 'Signup failed');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Error during signup');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setServerError('');
      setSuccessMsg('');
      return;
    }
    await postdata();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white   p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 ">Signup</h2>
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              autoComplete="username"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              autoComplete="name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              autoComplete="email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              autoComplete="new-password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded font-medium hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
        </form>
        {serverError && <p className="mt-4 text-center text-red-500">{serverError}</p>}
        {successMsg && <p className="mt-4 text-center text-green-600">{successMsg}</p>}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="text-gray-800 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
