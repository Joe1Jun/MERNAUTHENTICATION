import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import Main from './Component/Main'
import SignUp from './Component/SignUp/index';
import Login from './Component/Login';
import SignUp from './Component/SignUp/index';


function App() {
  
  const user = localStorage.getItem("token")

  return (

    <Routes>
      <Route path = '/' exact element= {<Main />} />

       </Routes>
  );
}

export default App;
