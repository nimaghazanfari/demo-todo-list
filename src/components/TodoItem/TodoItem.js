import React from 'react';
import styles from './TodoItem.module.css';

const TodoItem = ({ todo, removeHandler, updateHandler }) => (
    <div className={styles.itemContainer}>
        <div>
            <input
                type="checkbox"
                name={`checkbox-${todo.id}`}
                checked={todo.completed}
                onChange={() => updateHandler(todo.id)}
            />
            <label
                htmlFor={`checkbox-${todo.id}`}
                data-testid={`checkbox-${todo.id}`}
                onClick={() => updateHandler(todo.id)}
                className={todo.completed ? styles.completed : ''}
            >
                {todo.title}
            </label>
        </div>
        <button
            className={styles.closeBtn}
            data-testid={`close-btn-${todo.id}`}
            onClick={() => removeHandler(todo.id)}
        >
            x
        </button>
    </div>
);

export default TodoItem;