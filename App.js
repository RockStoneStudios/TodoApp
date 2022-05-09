import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import AddTodo from './src/screens/AddTodo';
import {store} from './src/redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();



const App  = () => {
 
  return (
     <Provider store={store}>

        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen  name='Home' component={Home} options={{headerShown : false}}/>
          <Stack.Screen name='Add' component={AddTodo} options={{presentation : 'modal'}} />
        </Stack.Navigator>
        </NavigationContainer>
     </Provider>
   
  );
};



export default App;
