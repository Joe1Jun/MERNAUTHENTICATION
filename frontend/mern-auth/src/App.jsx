import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; // Import necessary routing components
import Main from './Component/Main'; // Import Main component
import SignUp from './Component/SignUp'; // Import SignUp component
import Login from './Component/Login'; // Import Login component

function App() {
  // Check if a user token exists in localStorage to determine if the user is logged in
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {/* If the user is logged in, render the Main component at the root path */}
      {user ? (
        <Route path="/" element={<Main />} />
      ) : (
        <Route path="/" element={<Navigate replace to="/login" />} />
      )}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

