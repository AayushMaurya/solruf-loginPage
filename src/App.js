import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { auth } from './firebase';

function App() {

  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [user, setUser] = useState({});
  const [isValidated, setIsValidate] = useState(false);

  useEffect(()=>{
    auth.onAuthStateChanged(user => {
      console.log(user);

      if(user)
      {
        setIsAuthenticate(true);
        setUser(user);
      }

      setIsValidate(true);
    }); 
  }, []);

  return isValidated ? (
   <Router>
    <Routes>
      <Route exact path='/' element={<Home isAuthenticate = {isAuthenticate} user = {user}/>} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/signup' element={<Signup />} />
    </Routes>
   </Router>
  ) : (
    <div>
      Loading ...
    </div>
  );
}

export default App;
