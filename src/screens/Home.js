import React, { useEffect, useState } from 'react';

import {

  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
   View,
  Image,
  TouchableOpacity
} from 'react-native';
import TodoList from '../components/TodoList';
import { todosData } from '../data/todos';
import {useSelector,useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {hideComplitedReducer,setTodosReducer} from '../redux/todosSlice';
import moment from 'moment';



const Home = ({navigation}) => {
  //  const [localData,setLocalData] = useState(todosData.sort((a,b) => {return a.isCompleted - b.isCompleted}));
   const [isHidden,setIsHidden] = useState(false);
   const todos = useSelector(state=> state.todos.todos);
   const dispatch = useDispatch();

   useEffect(()=>{
      const getTodos = async () =>{
        try{
          const todos = await AsyncStorage.getItem('@Todos');
           if(todos){
             const todosData = JSON.parse(todos);
             const todosDataFiltered = todosData.filter(todo=>{
                return moment(todo.hour).isSameOrAfter(moment(), 'day');
             });
              // Eliminar todos de asyncStorage
              if(todosDataFiltered !== null){
                 await AsyncStorage.setItem("@Todos",JSON.stringify(todosDataFiltered));
                 dispatch(setTodosReducer(todosDataFiltered));
              }
           
           }
            return;
        }catch(error){
          console.log(error);
        }
      }
      getTodos()
   },[])


   const handleHidePress = async () => {
        if(isHidden) {
           console.log("Hello");
          setIsHidden(false);
          const todos = await AsyncStorage.getItem("@Todos");
           if(todos !== null){
             dispatch(setTodosReducer(JSON.parse(todos)))
           }
           return;
        }
        setIsHidden(true)
        dispatch(hideComplitedReducer());
      
   }
 
 
   return (
      <View style = {styles.container}>
          <Image  source={{uri : 'https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg'}} 
            style={styles.pic}
          />
          <View style={{flexDirection : 'row' , alignItems : 'center' , justifyContent : 'space-between'}}>

            <Text style={styles.title}>Today</Text>
            <TouchableOpacity onPress={handleHidePress}>
                <Text style={{color : '#3476f6'}}>{isHidden ? 'Show Completed' : 'Hide Complete'}</Text>
            </TouchableOpacity>
          </View>
           
             <TodoList todosData={todos.filter(item => item.isToday )}/>

          <Text style={styles.title}>Tomorrow</Text>
          <TodoList todosData={todos.filter(item => !item.isToday)}/>
        <TouchableOpacity onPress={()=> {navigation.navigate('Add')}} style={styles.button}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    paddingTop : 20,
    paddingHorizontal : 15

  },
  pic : {
      width: 42,
      height: 42,
      borderRadius : 21,
      alignSelf : 'flex-end'
  },
  title:{
      color: '#000',
      fontSize : 35,
      fontWeight : 'bold',
      marginBottom : 35,
      marginTop : 10
  },
  button : {
      width: 45,
      height: 45,
      borderRadius : 21,
      backgroundColor : '#000',
      position: 'absolute',
      bottom: 50,
      right: 20,
      shadowColor : '#001',
      shadowOffset : {
          width: 1,
          height: 2,
      },
      shadowOpacity : .5,
      shadowRadius : 5,
      elevation : 5
      
  },
  plus : {
       fontSize : 42,
       color: "#fff",
       position: 'absolute',
       top:  -8,
       left: 11
  }
});

export default Home;
