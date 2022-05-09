import React from "react";
import { StyleSheet,View,TouchableOpacity } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo'
import {updateTodoReducer} from '../redux/todosSlice';
import {useDispatch,useSelector} from 'react-redux';
import AsyncStorage  from "@react-native-async-storage/async-storage";


const CheckBox = ({id,text,isCompleted,isToday,hour}) =>{
    
      const dispatch = useDispatch();
      const listTodos = useSelector(state => state.todos.todos);

       const handleCheckBox = () =>{
           try{
               dispatch(updateTodoReducer({id,isCompleted}));
               AsyncStorage.setItem('@Todos',JSON.stringify(
                   listTodos.map(todo =>{
                       if(todo.id === id){
                           return {...todo,isCompleted : !todo.isCompleted}
                       }
                       return todo;
                   })
               ))
           }catch(error){
               console.log(error);
           }
       }

    return isToday ? (
        <TouchableOpacity onPress={handleCheckBox} style={isCompleted ? styles.checked : styles.unCheked}>
         {isCompleted && <Entypo name="check" size={16} color="#FAFAFA"/>}
        </TouchableOpacity>
    ) :(
        <View style={styles.isToday}/>

    
    )
}

const styles = StyleSheet.create({
    checked : {
        width: 20,
        height: 20,
        marginRight : 10,
        marginLeft : 1,
        borderRadius : 6,
        backgroundColor : '#262626',
        alignItems : 'center',
        justifyContent : 'center',
        shadowColor : '#000',
        shadowOffset :{
            width: 0,
            height: 2
        },
        shadowOpacity : .3,
        shadowRadius : 5,
        elevation : 5
    },
    unCheked : {
        width: 20,
        height: 20,
        marginRight : 5,
        borderWidth : 2,
        borderColor : '#E7E8E8',
        borderRadius : 6,
        backgroundColor : '#fff',
        marginLeft : 1,
        shadowColor : '#000',
        shadowOffset : {
            width: 0,
            height: 2
        },
        shadowOpacity : .1,
        shadowRadius : 5,
        elevation : 5
    },
    isToday : {
        width: 10,
        height: 10,
        marginHorizontal : 10,
        borderRadius : 10,
        backgroundColor : '#252626',
        marginRight : 1,
        marginLeft : 13
    }
})



export default CheckBox;