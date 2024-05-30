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
import HomePage from './components/Home/HomePage';
import DonorPage from './components/Donor/DonorFullPage';
import Form from './components/Form'
import CharityPage from './components/Charities/CharitiesPage';
import StripeContainer from './components/Stripe/CheckOut';
import Chat from './components/Chat/chatcomponent';
import ChatPage from './components/Chat/chatpage';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router> {/* Use Router alias as imported */}
      <Routes> {/* Wrap Route components inside Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/activate" element={<OTP />} />
        <Route path="/main" element={<MainPage />}/>
        <Route path="/profile" element={<UserProfile />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/donors" element={<DonorPage />}/>
        <Route path="/form" element={<Form />}/>
        <Route path="/Non-ProfitOrganizations" element={<CharityPage />}/>
        <Route path="/donate" element={<StripeContainer />}/>
        <Route path="/chat" element={<ChatPage />}/>
      </Routes>
    </Router>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
