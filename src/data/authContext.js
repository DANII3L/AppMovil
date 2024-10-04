import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskContext from '../context/TaskContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {state, dispatch} = useContext(TaskContext);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = state.userConnect.lenght > 0;
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkAuthStatus();
  }, [state.userConnect]);

  const login = async (token) => {
    try {
      await logout();
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          userCorreo: token,
        },
        collectionType: 'userConnect',
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to save token", error);
    }
  };

  const logout = async () => {
    try {
      dispatch({
        type: 'DELETE_ALL_ITEMS',
        payload: '',
        collectionType: 'userConnect',
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Failed to remove token", error);
    }
  };

  const registerDataUser = async (user) => {
    try {
      dispatch({
        type: 'ADD_ITEM',
        payload: user,
        collectionType: 'users',
      });
    } catch (e) {
      console.error('Error al guardar los datos', e);
    }
  };

  const getToken = async () => {
    try {
      const tokenData = await AsyncStorage.getItem('userToken');
      if (tokenData != null) {
        return tokenData;
      }
    } catch (e) {
      console.error('Error al recuperar los datos', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, registerDataUser, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
