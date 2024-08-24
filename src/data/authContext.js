import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (token) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to save token", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Failed to remove token", error);
    }
  };

  const registerDataUser = async (user) => {
    try {
      const jsonUser = JSON.stringify(user);
      await AsyncStorage.setItem('userData', jsonUser);
    } catch (e) {
      console.error('Error al guardar los datos', e);
    }
  };

  const getDataUsers = async () => {
    try {
      const jsonUsers = await AsyncStorage.getItem('userData');
      if (jsonUsers != null) {
        const usersData = JSON.parse(jsonUsers);
        return usersData;
      }
    } catch (e) {
      console.error('Error al recuperar los datos', e);
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, registerDataUser, getDataUsers, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
