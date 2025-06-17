import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddScore from './src/components/AddScore';
import Scorecard from './src/components/Scorecard';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AddScore"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="AddScore" component={AddScore} />
          <Stack.Screen
            name="Scorecard"
            component={Scorecard}
            options={{ title: 'Scorecard' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
