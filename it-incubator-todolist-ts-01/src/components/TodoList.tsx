import React from 'react';
import {TaskType} from "../App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}




const TodoList = (props:TodoListPropsType) => {

    // const getTasksElement = props.tasks.map((task) => {
    //     return(
    //         <li key={task.id}><input type="checkbox" checked={task.isDone}/>
    //             <span>{task.title}</span>
    //         </li>
    //     )
    // })


    const getTasksListItem = (task:TaskType) => {
        return(
            <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => alert(task.id)}>X</button>
            </li>
        )
    }


    return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map(getTasksListItem)}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    );
};

export default TodoList;