import React, { useState } from 'react'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'


function App(props) {

  // to preserve the initial state of the props.tasks
  const [tasks, setTasks] = useState(props.tasks);
  
  function addTask(name) {
    alert(name);
  }

  //  DATA array available to the App component as props.tasks
  // console.log(props.tasks);

  // old way without useState
  // const taskList = props.tasks.map(task => <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} />);

  // change taskList maping to tasks as the state is preserved with useState
  
  const taskList = tasks.map(task => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed} 
      key={task.id} 
    />
  ))
   
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
        3 tasks remaining
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
