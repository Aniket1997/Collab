import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import styles for the phone input
import InputField from '../componets/InputField';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      phone: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        email: formData.email,
        password: formData.password,
        phone: formData.phone // Include mobile number in the request
      });

      console.log(response.data.message);
      
      // Reset form fields
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      } else {
        console.error('Error during registration:', error);
        alert("An error occurred while registering. Please try again later.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600">
              Mobile Number
            </label>
            <PhoneInput
              country={'us'} // Set default country code
              value={formData.phone}
              onChange={handlePhoneChange}
              required
              className="mt-2"
              inputStyle={{
                width: '100%'
              }}
            />
          </div>

          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-gray-500">or</span>
        </div>

        <button
          //onClick={handleGoogleSignup}
          className="w-full px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none"
        >
          <div className="flex items-center justify-center">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google icon"
              className="w-6 h-6 mr-2"
            />
            <span>Sign up with Google</span>
          </div>
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
