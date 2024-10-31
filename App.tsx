/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {AuthProvider} from './src/data/authContext';
import AppStack from './navigation/AppStack';
import {TaskProvider} from './src/context/TaskContext';
import firebase, {FirebaseContext} from './src/firebase';

function App(): React.JSX.Element {
  return (
    <FirebaseContext.Provider value={{firebase: firebase}}>
      <TaskProvider>
        <AuthProvider>
          <AppStack />
        </AuthProvider>
      </TaskProvider>
    </FirebaseContext.Provider>
  );
}

export default App;
