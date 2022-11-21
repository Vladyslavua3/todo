import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";

export type  TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


const App = () => {

    const TodoListTitle: string = "What to learn"


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: true},
        {id: v1(), title: "ReactRedux", isDone: false}
    ])


    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskId: string) => {
        const updateTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updateTasks)
    }

    const addTask = (title:string) => {
        let newTask = {id:v1(),title:title,isDone:false}
        let newTasks = [newTask,...tasks]
        setTasks(newTasks)
    }


    const changeTodoListFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    }


    let tasksForRender:Array<TaskType> = [];
    if(filter === "all"){
        tasksForRender = tasks
    }else if(filter === "active"){
        tasksForRender = tasks.filter(task => task.isDone === false)
    }else if(filter === "completed"){
        tasksForRender = tasks.filter(task => task.isDone === true)
    }



    // const TodoListTitle_2 = "What to buy"
    // const tasks_2:Array<TaskType> = [
    //     {id:4,title:"Cola",isDone:false},
    //     {id:5,title:"Chicken",isDone:true},
    //     {id:6,title:"Beer",isDone:true}
    // ]


    return (
        <div className="App">
            <TodoList
                tasks={tasksForRender}
                title={TodoListTitle}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
