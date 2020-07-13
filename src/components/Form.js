import React, { useState } from 'react';

{/* 
useState() creates a piece of state for a component
it has one parameter that determines the initial value of that state
it return two things: the state and function that can update the state later
*/}


function Form(props) {
    {/* 
        initial name value to 'Use hooks'
        defining a function setName() which should modify name
        useState() returns these two things and we use array destructuring to capture them in variables name and setName
    */}
    const [name, setName] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault();
        {/* accesing addTask function from App 
            props.addTask("Say Hello"); 
        */}
        {/* call props.addTask with name as an argument, send the task back to the App component, so it can be added to the list of tasks later on */}
        props.addTask(name);
        setName('');
    }

    function handleChange(e) {
        {/* store updated state */}
        setName(e.target.value);
    }

    return(
        <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off" 
          value={name} 
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
}

export default Form;