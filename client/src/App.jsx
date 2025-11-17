// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import TestimonialsPage from './pages/Testimonials';
import FAQPage from './pages/FAQ';
import ContactPage from './pages/Contact';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
// import UserPanel from './pages/UserPanel';
// import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import AdminPanel from './pages/Adminpanel';
import { useSelector } from 'react-redux';
import UserLayout from './components/UserLayout';
import CreatePitchDeck from './pages/CreatePitchDeck';
import Certifications from './pages/Certifications';
import ScrollToTop from './components/ScrollToTop';
import AdminLayout from './components/AdminLayout';
import ManageUsers from './pages/ManageUsers';


function App() {

  const token = useSelector(state => state.auth.token)
  const role = useSelector(state => state.auth.role)

  return (
    <Router>
      <div className="App relative bg-gray-900 min-h-screen">

        

        {/* <AnimatedBackground /> */}
        <div style={{ position: 'relative', zIndex: 1 }}>

          
          <Navbar />

          <ScrollToTop/>
           
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
         
            <Route path="/register" element={<Register />} />
            <Route path='/adminpanel' element={<AdminPanel/>}/>
            <Route path="*" element={<NotFound />} />
            {/* <Route 
              path="/user-panel" 
              element={
                <ProtectedRoute requiredRole="user">
                  <UserPanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-panel" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
                </ProtectedRoute>
              } 
            /> */}

              {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminLayout />} />
          <Route path="employees" element={<ManageUsers />} />
        
        </Route>

          <Route
            path="/user"
            element={  
                <UserLayout />

            }
          >
          <Route index element={<Profile/>}  />
            <Route path="profile" element={<Profile />} />
            <Route path='services/pitch-deck' element={<CreatePitchDeck/>}/>
            <Route path='services/certifications' element={<Certifications/>}/>
          </Route>

          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
