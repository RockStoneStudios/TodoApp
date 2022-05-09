import React, { useState } from 'react'
import { StyleSheet,Text,Touchable,TouchableOpacity,View } from 'react-native';
import Checkbox from './CheckBox';
import moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { deleteTodoReducer } from '../redux/todosSlice';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Todo = ({id,text,isCompleted,isToday,hour}) => {
  const [localHour,setLocalHour] = useState(new Date(hour));
   const todos = useSelector(state=> state.todos.todos);
   const dispatch = useDispatch();


   const handleDeleteTodo = async () => {
        dispatch(deleteTodoReducer({id}));
        try {
           await AsyncStorage.setItem('@Todos',JSON.stringify(
             todos.filter(todo=> todo.id !==id)
           ));
        }catch(error){
           console.log(error);
        }
   }
  
  return (
      
    <View style={styles.container}>
       <View style={{flexDirection : 'row', alignItems : 'center', flex : 5 }}>
          <Checkbox
             
              id={id}
              text ={text}
              isCompleted = {isCompleted}
              isToday = {isToday}
              hour = {hour}
            />
            <View>

                <Text style={
                    isCompleted ? [styles.text ,{textDecorationLine : 'line-through',color:'#222'}]
                    : styles.text
                    }>{text}</Text>
                <Text 
                style={
                    isCompleted ? [styles.time ,{textDecorationLine :'line-through',color :'#222'}]
                    :styles.time
                    }>{moment(localHour).format('LT')}</Text>
            </View>
       </View>
         <TouchableOpacity  onPress={handleDeleteTodo}>
            <MaterialIcon  name='delete-outline' size={24} color="#737373"/>
         </TouchableOpacity>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        marginBottom: 20,
         flexDirection : 'row',
         alignItems : 'center',
         justifyContent : 'space-between',       

    },
     text : {
       fontSize : 18,
       fontWeight : '600',
       color: '#070707',
       paddingHorizontal : 10,
       marginRight : 50
     },
     time : {
         fontSize : 15,
         color: "#070707",
         fontWeight : '600',
         paddingHorizontal : 10
          
     }
})

export default Todo