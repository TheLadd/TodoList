import { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import {v4 as uuidv4} from 'uuid'

/*

  useState: hook that allows us to implement state into our React project
  useRef: hook that allows use to Ref(erence) our HTML elements

*/

const TASKS_KEY = 'todoApp.tasks' // Let this be a key to use with localStorage to designate our list of tasks

function App() {
  // Initialize our tasks state and our change handler
  const [tasks, setTasks] = useState([])

  // Create an HTML reference which we later assign to a text input box
  const todoNameRef = useRef()

  // Use an effect that runs only in the beggining to load any state that might have existed before this load
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(TASKS_KEY))
    if (storedTasks.length > 0) {
      setTasks(storedTasks)
    }
  }, [])

  // Create a change handler ('effect') that will save our 'tasks' state as a JSON
  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  }, [tasks])

  function handleAddTask() {
    const name = todoNameRef.current.value
    if (name === '') return

    setTasks(prevTasks => {
      const newTask = { id: uuidv4(), name: name, completed: false}
      return [...prevTasks, newTask]
    })
    
    // Resets the text box after every submit
    todoNameRef.current.value = null
  }

  function handleClearTasks() {
    const newTasks = tasks.filter(task => !task.completed)
    setTasks(newTasks)
  }

  function taskToggle(id) {
    const newTasks = [...tasks]
    const toggledTask = newTasks.find(task => task.id === id)
    toggledTask.completed = !toggledTask.completed
    setTasks(newTasks)
  }

  return (
    <>
      <TodoList tasks={tasks} taskToggle={taskToggle}/>
      <input ref={todoNameRef} type='text' />
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={handleClearTasks}>Clear Completed Tasks</button>
      <div>Remaining Tasks: {tasks.filter(task => !task.completed).length}</div>
    </>
  );
}

export default App;
