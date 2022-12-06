import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";


type TodoListPropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string,todoListId:string) => void
    changeTodoListFilter: (nextFilterValue: FilterValuesType,toDoId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todoListId:string) => void
    addTask: (title: string,todoListId:string) => void
    removeToDoList:(todoListId:string) => void
}


const TodoList = (props: TodoListPropsType) => {

    const [newTitle, setNewTitle] = useState('');
    const [error,setError] = useState<boolean>(false)

    const getTasksListItem = (task: TaskType) => {

        const removeTask = () => props.removeTask(task.id,props.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked,props.id)
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeTaskStatus}
                />
                <span className={task.isDone ? 'task-done' : ''}>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    }


    const addTask = () => {
        const trimmedTittle = newTitle.trim()
        if (trimmedTittle) {
            props.addTask(trimmedTittle,props.id)
        }else {setError(true)}
        setNewTitle('')
    }

    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTitle(e.currentTarget.value)
    }

    const onEnterTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter,props.id)
    }

    const removeToDoList = () => {
         props.removeToDoList(props.id)
    }


    return (
        <div>
            <h3>{props.title} <button onClick={removeToDoList}>x</button></h3>
            <div>
                <input
                    value={newTitle}
                    onKeyDown={onEnterTask}
                    onChange={setLocalTitle}
                    className={error ? "input-error" : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{fontWeight:"bold",color:"red"}}>Please , enter your task</div>}
            </div>
            <ul>
                {props.tasks.length ? props.tasks.map(getTasksListItem) : <span>Where are you task?????</span>}
            </ul>
            <div>
                <button className={props.filter === "all" ? "btn-active" : ""}
                        onClick={onClickHandlerCreator("all")}>all
                </button>
                <button className={props.filter === "active" ? "btn-active" : ""}
                        onClick={onClickHandlerCreator("active")}>Active
                </button>
                <button className={props.filter === "completed" ? "btn-active" : ""}
                        onClick={onClickHandlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;