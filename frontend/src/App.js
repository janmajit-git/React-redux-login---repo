import Homepage from "./components/home/Homepage";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/actions";


function App() {
  
  var loggedUser = localStorage.getItem('token');
  const dispatch = useDispatch();
  loggedUser ? dispatch(fetchUser(loggedUser)) : dispatch(fetchUser(null));
    

  return (
    <div className="App">
        <Routes>
        <Route path="/" element={loggedUser ? <Navigate to="/Homepage" state={ loggedUser } /> : <Login />} />
        <Route path='/Homepage' element={<Homepage />}/>
          <Route path="/Register" element={<Register />} />
        </Routes>
    </div>
  );
}


export default App;
