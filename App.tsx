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

function App(): React.JSX.Element {
  return (
    <TaskProvider>
      <AuthProvider>
        <AppStack />
      </AuthProvider>
    </TaskProvider>
  );
}

export default App;
