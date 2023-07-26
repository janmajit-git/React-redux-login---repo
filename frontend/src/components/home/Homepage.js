import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions";

function Homepage() {
  const dispatch = useDispatch();
  var loggedUser = useSelector(state => state.loggedUser);
  const log_out = async () => {
    try{

      await localStorage.removeItem('token');
      dispatch(logOut());
      window.location.href ='http://localhost:3000/';

    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <>
    <div>
      
      <h1>{`Hi! ${loggedUser} Welcome to Homepage which is only visible when you are logged in `}</h1>
      <div className='text-center'>
        <button type="button" className="btn btn-primary" onClick= {log_out}>Log out</button>
      </div>
  
    </div>
    </>
  )
}

export default Homepage;
