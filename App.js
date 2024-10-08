import React, { useReducer, useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, View } from 'react-native';

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { text: action.text }]; 
    case 'REMOVE_TODO':
      return state.filter((_, index) => index !== action.index); 
    
  }
}

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', text }); 
      setText('');
    }
  };

  const removeTodo = (index) => {
    dispatch({ type: 'REMOVE_TODO', index }); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Save" onPress={addTodo} />
      </View>
      
      <FlatList
        data={state}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => removeTodo(index)}>
            <Text style={styles.todoItem}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  todoItem: {
    padding: 10,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
  },
});

export default TodoApp;
