import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  message: '',
  type: '',
}

const NotificationContext = createContext(initialState);

export const useNotification = () => {
  return useContext(NotificationContext);
}

const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return { message: action.payload.message, type: action.payload.type }
    case CLEAR_NOTIFICATION:
      return initialState
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const setNotification = (message, type) => {
    dispatch({ type: SET_NOTIFICATION, payload: { message, type } })
    setTimeout(() => 
    dispatch({ 
        type: CLEAR_NOTIFICATION 
    }), 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification: state, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}