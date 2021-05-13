import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos, removeHandler, updateHandler }) => (
    <div>
        <div>{todos.map((item, i) =>
            <TodoItem key={i} todo={item} removeHandler={removeHandler} updateHandler={updateHandler} />
        )}</div>
    </div>
);

export default TodoList;