import React, { useState } from 'react';

export default function Todo(props) {
    // console.log(props);

    // isEditing state set to false as default
    const [isEditing, setEditing] = useState(false);
    // new hook for storing and setting new name
    const [newName, setNewName] = useState('');

    // set the new name
    function handleChange(e) {
      setNewName(e.target.value);
    }

    // handle the edit form's onSubmit event
    function handleSubmit(e) {
      e.preventDefault();
      props.editTask(props.id, newName);
      setNewName("");
      setEditing(false);
    }

   {/*  two templates: one for editing and another one for viewing inside two separate constants
    */}

     {/*  bind handleSubmit event bu adding onSubmit event handler to the edditing template's form
      */}
    const editingTemplate = (
     
      <form className="stack-small" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
            New name for {props.name}
          </label>
          // set value attribute to newNamen and bind handleChange
          <input id={props.id} className="todo-text" type="text" value={newName} onChange={handleChange} />
        </div>
        <div className="btn-group">
          <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
          <button type="submit" className="btn btn__primary todo-edit">
            Save
            <span className="visually-hidden">new name for {props.name}</span>
          </button>
        </div>
      </form>
    );
    const viewTemplate = (
      <div className="stack-small">
        <div className="c-cb">
            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed}
              onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn" onClick={() => setEditing(true)}>
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={() => props.deleteTask(props.id)}
            >
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
      </div>
    );
    // condition to render different templates
    return (
      <li className="todo stack-small">{isEditing ? editingTemplate : viewTemplate}
        <div className="c-cb">
          <input id="todo-0" type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)} />
          <label className="todo-label" htmlFor="props.id">
            {props.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">Eat</span>
          </button>
          <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>
            Delete <span className="visually-hidden">Eat</span>
          </button>
        </div>
      </li>
    );
}