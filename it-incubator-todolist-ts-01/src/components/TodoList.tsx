import React, {useState} from 'react';
import {FilterValuesType, TaskType} from "../App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (nextFilterValue: FilterValuesType) => void
    addTask:(title:string) => void
}


const TodoList = (props: TodoListPropsType) => {

    // Using map
    // const getTasksElement = props.tasks.map((task) => {
    //     return(
    //         <li key={task.id}><input type="checkbox" checked={task.isDone}/>
    //             <span>{task.title}</span>
    //         </li>
    //     )
    // })


    const[newTitle,setNewTitle] = useState('');



    const getTasksListItem = (task: TaskType) => {

        return (
            <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
        )
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle} onChange={(e) => {
                   setNewTitle(e.currentTarget.value)
                }}/>
                <button onClick={() => {props.addTask(newTitle)
                setNewTitle('')
                }}>
                    +
                </button>
            </div>
            <ul>
                {props.tasks.map(getTasksListItem)}
            </ul>
            <div>
                <button onClick={() => props.changeTodoListFilter("all")}>all</button>
                <button onClick={() => props.changeTodoListFilter("active")}>Active</button>
                <button onClick={() => props.changeTodoListFilter("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;