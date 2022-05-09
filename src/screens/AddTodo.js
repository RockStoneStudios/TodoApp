import React, { useState } from "react";
import {View, Text,TouchableOpacity,StyleSheet,TextInput,Switch} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch,useSelector} from 'react-redux';
import { addTodoReducer } from "../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {Notifications} from 'react-native-notifications';

const AddTodo = () => {
    const [name,setName] = useState('');
    const [date,setDate] = useState(new Date());
    const [isToday,setIsToday] = useState(false);
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const listTodos = useSelector(state => state.todos.todos);

    const addTodo = async () => {
       const newTodo = {
           id: Math.random().toString(32).substring(2)+Date.now().toString(32),
           text : name,
           hour : date.toString(),
           isToday : isToday,
           isCompleted : false
       }
       try {
          await AsyncStorage.setItem('@Todos',JSON.stringify([...listTodos,newTodo]));
          dispatch(addTodoReducer(newTodo));
          navigation.navigate('Home');

       }catch(error){
           console.log(error);
       }
    }
    
    //  const scheduleTodoNotificacion = async (todo)=>{
    //      const trigger = new Date(todo.hour);
    //      try{
    //           await Notifications._android.
    //      }catch(error){
    //          console.log(error);
    //      }
    //  }

    return(
        <View style={styles.constainer}>
            <Text style= {styles.title}>Add Task</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                    placeholder="Task"
                    placeholderTextColor= '#000031'
                    style={styles.textInput}
                    onChangeText = {text => setName(text)}
                    />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}
                  onPress = {()=> setOpen(!open)}
                >Hour</Text>
                {open && (
                   <DatePicker
                   date={date}
                   mode="time"
                   open = {open}
                   onConfirm ={(date) =>{
                       setOpen(false);
                       setDate(date)
                   }}
                   onCancel = {()=> {
                       setOpen(false);
                   }}
                 
                   style ={{width : 180}}
                   is24hourSource = 'device'
                />
                )}
               
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>Today</Text>
                <Switch
                 value={isToday}
                 onValueChange ={value => setIsToday(value)}
                
                 />
            </View>
                  <TouchableOpacity onPress={addTodo} style= {styles.button}>
                      <Text style={{color : 'white', fontSize : 16, letterSpacing : 1}}> Done</Text>
                  </TouchableOpacity>
                <Text style={{color : '#001'}}>If you disable today, the task will be considered as tomorrow</Text>
        </View>

    )
}


const styles = StyleSheet.create({
    constainer : {
       flex: 1,
       backgroundColor : '#f7f8fa',
       paddingHorizontal : 30
    },
    title : {
        fontSize : 34,
        fontWeight : 'bold',
        marginBottom : 35,
        marginTop : 10,
        color: "#001"
    },
    inputTitle : {
        fontSize : 20,
        fontWeight : '600',
        lineHeight : 24,
        color: '#010'
    },
    textInput : {
        borderBottomColor : '#000030',
        borderBottomWidth : 1,
        width: '80%',
        fontSize : 16
    },
     inputContainer : {
          flexDirection  :'row',
          justifyContent : 'space-between',
          alignItems : 'center',
          paddingBottom : 30
     },
     button :{
          marginTop : 30,
          marginBottom : 15,
          alignItems : 'center',
          justifyContent :'center',
          backgroundColor : '#000000',
          height:  46,
          borderRadius : 11
          
     }
})


export default AddTodo;