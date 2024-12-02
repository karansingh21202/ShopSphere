import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from "../Context/ContextProvider";
import { toast, ToastContainer } from 'react-toastify';
import { SiShopware } from "react-icons/si";
import 'react-toastify/dist/ReactToastify.css';
import './RegistrationPage.css';
import avataad from '../data/avat.png';

const Registration = () => {
  const { currentColor, handleClose } = useStateContext(); // Access theme context

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [passwordStrength, setPasswordStrength] = useState({ label: '', percentage: 0, color: '' });

  // Regular expression for email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (id === 'password') {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength({ label: '', percentage: 0, color: '' });
    } else if (password.length < 6) {
      setPasswordStrength({ label: 'Password is Weak', percentage: 33, color: '#e63946' });
    } else if (password.match(/(?=.*[0-9])(?=.*[!@#$%^&*])/)) {
      setPasswordStrength({ label: 'Password is Strong', percentage: 100, color: '#06d6a0' });
    } else {
      setPasswordStrength({ label: 'Password is Moderate', percentage: 66, color: '#ffba08' });
    }
  };

  const handleRegister = () => {
    // Check if email and password are filled
    if (!user.email || !user.password) {
      toast.error('Please fill in all fields!');
      return;
    }

    // Validate email format
    if (!isValidEmail(user.email)) {
      toast.error('Please enter a valid email address!');
      return;
    }

    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser({ email: '', password: '' }); // Clear input fields after registration
    toast.success('User registered successfully!');
  };

  return (
    <div className="registration-container">
      {/* Close Button */}
      <button
        type="button"
        onClick={() => handleClose("registration")} // Close the registration page
        style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
        className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray absolute top-2 right-2"
      >
        <MdOutlineCancel />
      </button>

      <div className="registration-card">
      <SiShopware size={30} />
        <div className="text-center">
          <img
            src={avataad}
            alt="Avatar"
            className="registration-avatar"
          />
          <h3 className="registration-title">Welcome, Register Now!</h3>
          <p className="registration-subtitle">Sign up to continue</p>
        </div>
        <div>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            className="form-control"
            value={user.email}
            onChange={handleInputChange}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="form-control"
            value={user.password}
            onChange={handleInputChange}
          />
          {passwordStrength.label && (
            <div className="password-strength-container">
              <div
                className="password-strength-bar"
                style={{
                  width: `${passwordStrength.percentage}%`,
                  backgroundColor: passwordStrength.color,
                }}
              ></div>
              <span className="password-strength-label">{passwordStrength.label}</span>
            </div>
          )}
          <button
            onClick={handleRegister}
            className="registration-btn"
            style={{
              backgroundColor: currentColor,
              borderColor: currentColor,
            }}
          >
            Register
          </button>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default Registration;
