import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (nextFilterValue: FilterValuesType) => void
    changeTaskStatus: (taskId: string,isDone:boolean) => void
    addTask: (title: string) => void
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


    const [newTitle, setNewTitle] = useState('');

    const getTasksListItem = (task: TaskType) => {

        const removeTask = () => props.removeTask(task.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id,e.currentTarget.checked)
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeTaskStatus}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    }


    const addTask = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onEnterTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    //
    // const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus}

    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTitle}
                    onKeyDown={onEnterTask}
                    onChange={setLocalTitle}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(getTasksListItem)}
            </ul>
            <div>
                <button onClick={onClickHandlerCreator("all")}>all</button>
                <button onClick={onClickHandlerCreator("active")}>Active</button>
                <button onClick={onClickHandlerCreator("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;