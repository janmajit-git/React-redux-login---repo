
const initialState = { loggedUser : null };

const reducer = (state = initialState, action) => {
  switch(action.type)
  {
    case 'FETCH' : return { 
      ...state,
      loggedUser : action.payload 
    }

    case 'LOG IN' : return { 
      ...state,
      loggedUser : action.payload 
    }

    case 'REGISTER' : return { 
      ...state,
      loggedUser : action.payload 
    }
   
    case 'LOG OUT' : return { 
      ...state,
      loggedUser : action.payload 
    }

    default : return state;

  }
}

export default reducer;