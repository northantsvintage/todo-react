import React, { useState } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import { nanoid } from 'nanoid'

function App(props) {

  // to preserve the initial state of the props.tasks
  const [tasks, setTasks] = useState(props.tasks);
  
  {/*  
    name is string and tasks is an array of objects; if you use name array would be replaced, no tasks added
    workaround: put name-string into an object with same strucuture as existing tasks
    then update the state of the tasks to this new state
    ...spread syntax used to copy the existing array and add object at the end
    then pass this array into setTasks() to update state
  */}
  
  function addTask(name) {
    // const newTask = { id: "id", name: name, completed:false };
    const newTask = { id: "todo-" + nanoid(), name: name, completed:false };
    setTasks([...tasks, newTask]);
  }

   {/* change the completed property of only the task that was toggled */}
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  {/*
    edit task: take an id to find target object
    newName property containing the name to update the task
    map to return new array with some changes
  */}
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }
 
  {/*
    delete task
    setTasks() expects an array as an argument, provide it with a new array that copies the existing tasks, excluding the task whose ID matches the one passed into deleteTask().
  */}
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  {/* 
  each task needs new unique id; use nanoid librayr to make unique identifiers (npm install nanoid)


  DATA array available to the App component as props.tasks
  console.log(props.tasks);

  old way without useState
  const taskList = props.tasks.map(task => <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} />);

  change taskList maping to tasks as the state is preserved with useState
  
  tasks or taskList is an array of objects after mapping
  */}
  const taskList = tasks.map(task => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed} 
      key={task.id} 
      toggleTaskCompleted={toggleTaskCompleted} 
      deleteTask={deleteTask} 
      editTask={editTask}
    />
  ))
    {/* counting number of tasks and using singuar or plural noun */}
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  return (
    
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      {/* 
         handling form submission via callbacks
         function expect some data from form as an input
         then pass that function to form as prop
         this function as a prop is callback prop
         you call this callback from inside <Form /> to send data to App
      */}
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
      {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
