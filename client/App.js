import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {BASE_URL} from './config';

function App() {
  fetch(`${BASE_URL}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log('Fetch err', err));

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

LogBox.ignoreAllLogs();

export default App;
