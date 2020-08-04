import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/user/login/login';
import Signup from './components/user/login/signup';
import sendLinkResetPassword from './components/user/login/sendLinkResetPassword';
import ResetPassword from './components/user/login/resetPassword';
import User from './components/user/index/userMainContainer';


function App() {
  return (
    <Router>
      
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/reset" component={sendLinkResetPassword} />
      <Route path="/restore" component={ResetPassword} />
      <Route path="/" exact component={User} />
    </Router>
  );
}

export default App;




