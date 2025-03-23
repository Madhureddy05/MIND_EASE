import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const ToDoList = () => {
  const navigation = useNavigation();
  
  // Hide header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const storedFinishedTasks = await AsyncStorage.getItem('finishedTasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
      if (storedFinishedTasks) setFinishedTasks(JSON.parse(storedFinishedTasks));
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (newTasks, newFinishedTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      await AsyncStorage.setItem('finishedTasks', JSON.stringify(newFinishedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = () => {
    if (!task.trim()) {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    const newTask = { 
      id: Date.now().toString(), 
      title: task, 
      date: date.toDateString(),
      completed: false 
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks, finishedTasks);
    setTask('');
  };

  const finishTask = (taskId) => {
    const taskToMove = tasks.find(task => task.id === taskId);
    if (!taskToMove) return;

    const updatedTasks = tasks.filter(task => task.id !== taskId);
    const updatedFinishedTasks = [...finishedTasks, taskToMove];

    setTasks(updatedTasks);
    setFinishedTasks(updatedFinishedTasks);
    saveTasks(updatedTasks, updatedFinishedTasks);
  };

  // Add delete task function for active tasks
  const deleteTask = (taskId) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
            saveTasks(updatedTasks, finishedTasks);
          },
          style: "destructive"
        }
      ]
    );
  };

  // Add delete function for finished tasks
  const deleteFinishedTask = (taskId) => {
    Alert.alert(
      "Delete Completed Task",
      "Are you sure you want to delete this completed task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedFinishedTasks = finishedTasks.filter(task => task.id !== taskId);
            setFinishedTasks(updatedFinishedTasks);
            saveTasks(tasks, updatedFinishedTasks);
          },
          style: "destructive"
        }
      ]
    );
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> To-Do List</Text>

      {/* Date Picker */}
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        Platform.OS === 'android' ? (
          <DateTimePicker
            value={date}
            mode="date"
            display="calendar"
            onChange={onDateChange}
          />
        ) : (
          <View style={styles.iosDateContainer}>
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
            <TouchableOpacity 
              style={styles.doneButton} 
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        )
      )}

      <Text style={styles.selectedDate}>Selected Date: {date.toDateString()}</Text>

      {/* Task Input */}
      <TextInput 
        style={styles.input} 
        placeholder="Enter task..." 
        value={task} 
        onChangeText={setTask}
      />

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.buttonText}>➕ Add Task</Text>
      </TouchableOpacity>

      {/* Active Task List */}
      <Text style={styles.sectionTitle}> Tasks</Text>
      <FlatList 
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity 
              style={styles.taskTextContainer}
              onPress={() => finishTask(item.id)}
            >
              <Text style={styles.taskText}>
                {item.date} - {item.title}
              </Text>
            </TouchableOpacity>
            <View style={styles.taskButtonsContainer}>
              <TouchableOpacity onPress={() => finishTask(item.id)}>
                <Text style={styles.checkbox}>✔️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteButton}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Finished Task List */}
      <Text style={styles.sectionTitle}> Finished Tasks</Text>
      <FlatList 
        data={finishedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.finishedTaskItem}>
            <Text style={styles.taskText}>
              {item.date} - {item.title}
            </Text>
            <View style={styles.taskButtonsContainer}>
              <Text style={styles.finishedCheck}>✅</Text>
              <TouchableOpacity onPress={() => deleteFinishedTask(item.id)}>
                <Text style={styles.deleteButton}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#546C75',
    paddingTop: 50 // Increased to account for status bar and removed header
  },
  
  title: { 
    fontSize: 25, 
    //fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20 ,
    color:'white'
  },
  input: { 
    borderWidth: 1, 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 10, 
    backgroundColor: '#fff' 
  },
  dateButton: { 
    backgroundColor: '#A7D8DE', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 10 
  },
  selectedDate: { 
    textAlign: 'center', 
    fontSize: 16, 
    marginBottom: 10 ,
    
  },
  addButton: { 
    backgroundColor: '#A7D8DE', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginBottom: 10,

  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold',
    color:'black' 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 20, 
    marginBottom: 10,
    color:'white' 
  },
  taskItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    padding: 15, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    marginVertical: 5, 
    elevation: 2 
  },
  finishedTaskItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    padding: 15, 
    backgroundColor: '#D4EDDA', 
    borderRadius: 8, 
    marginVertical: 5, 
    elevation: 2 
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: { 
    fontSize: 16, 
    flex: 1 
  },
  taskButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: { 
    fontSize: 20, 
    marginLeft: 10, 
    color: '#007AFF' 
  },
  finishedCheck: { 
    fontSize: 20, 
    marginLeft: 10, 
    color: '#28A745' 
  },
  deleteButton: {
    fontSize: 20,
    marginLeft: 10,
    color: '#DC3545'
  },
  iosDateContainer: { 
    alignItems: 'center', 
    marginBottom: 10 
  },
  doneButton: { 
    backgroundColor: '#007AFF', 
    padding: 10, 
    borderRadius: 5, 
    marginTop: 10, 
    alignItems: 'center' 
  }
});

export default ToDoList;