import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import "./index.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";
import OTP from './components/Otp';
import Survey from './components/Form';
import LandingPage from './components/LandingPage/LandingPage';
import Sidebar from './components/MainPage/SideNavBar';
import MainPage from './components/MainPage/MainPage';
import UserProfile from './components/UserProfile/UserProfile';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router> {/* Use Router alias as imported */}
      <Routes> {/* Wrap Route components inside Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/activate" element={<OTP />} />
        <Route path="/main" element={<MainPage />}/>
        <Route path="/profile" element={<UserProfile />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
