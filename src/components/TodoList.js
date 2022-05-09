import React from 'react';
import {FlatList, View,Text} from 'react-native';
import Todo from './Todo';


const TodoList = ({todosData}) => {

    return(
        <FlatList
        data={todosData}
        keyExtractor = {item => item.id}
        renderItem ={({item}) => (
           <Todo {...item}/>
        )}
        />
    )
}

export default TodoList;