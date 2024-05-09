import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ContactPage from './components/ContactPage'
import FeaturePage from './components/FeaturePage';
import AboutUS from './components/AboutUS';
import Intro from './components/Intro';
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Playground from './components/Playground';
import Compiler from './components/Compiler';
import HtmlRunner from './components/HtmlRunner';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import ResetForgotPassword from './components/ResetForgotPassword';


function App() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Time in milliseconds for which the Intro component should be rendered
    const introDuration = 5000; // 5 seconds

    const hideIntro = async () => {
      await delay(introDuration);
      setShowIntro(false);
    };

    hideIntro();
  }, []);


  return (
    <>
      {showIntro ? (
        <Intro />
      ) : (
        <Router>
          <NavBar />
          <Routes>            
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/contact' element={<ContactPage />}></Route>
            <Route path='/aboutus' element={<AboutUS />}></Route>
            <Route path='/feature' element={<FeaturePage />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/playground' element={<Playground />}></Route>
            <Route path='/compiler' element={<Compiler />}></Route>
            <Route path='/html' element={<HtmlRunner />}></Route>
            <Route path='/reset-password' element={<ResetPassword />}></Route>            
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>            
            <Route path='/resetForgotPassword/:resetToken' element={<ResetForgotPassword />}></Route>            
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
