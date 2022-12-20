import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type TodoListPropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string,todoListId:string) => void
    changeTodoListFilter: (nextFilterValue: FilterValuesType,toDoId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todoListId:string) => void
    changeTaskTitle: (todoListId:string,newTitle:string,taskId:string) => void
    addTask: (title: string,todoListId:string) => void
    removeToDoList:(todoListId:string) => void
    updateTodoTitle:(toDoId:string,newTitle:string) => void
}


const TodoList = (props: TodoListPropsType) => {


    const getTasksListItem = (task: TaskType) => {

        const removeTask = () => props.removeTask(task.id,props.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked,props.id)
        const onChangeTitle = (newTitle:string) => {
            props.changeTaskTitle(props.id,newTitle,task.id)
        }
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={changeTaskStatus}
                />
                <EditableSpan  title={task.title} onChange={onChangeTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    }



    const onClickHandlerCreator = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter,props.id)
    }

    const removeToDoList = () => {
         props.removeToDoList(props.id)
    }

    const addTask = (title:string) => {
        props.addTask(title,props.id)
    }

    const updateToDoTitle = (newTitle:string) => {
        props.updateTodoTitle(props.id,newTitle)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={updateToDoTitle}/>
                <button onClick={removeToDoList}>x</button></h3>
            <AddItemForm addItem={addTask}/>
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


