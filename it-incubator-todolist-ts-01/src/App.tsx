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
        // let newTask:TaskType = {id:v1(),title,isDone:false}
        // let newTasks = [newTask,...tasks]
        setTasks([{id:v1(),title,isDone:false},...tasks])
    }

    const changeTaskStatus = (taskId:string,isDone:boolean) => {
        // let task = tasks.find(t => t.id === taskId);
        // if(task) {
        //     task.isDone = isDone;
        // }
        // setTasks(tasks)
        // setTasks(tasks.map((task)=> {
        //     if (task.id === taskId) return {...task, isDone: !task.isDone}
        //     else return task
        // }))

        setTasks(tasks.map(t => t.id === taskId ?{...t, isDone: isDone}: t))
    }

    const changeTodoListFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    }




    const getFilteredTasks = (tasks:Array<TaskType>,filter:FilterValuesType):Array<TaskType> => {
        // if(filter === "all"){
        //     return  tasks
        // }else if(filter === "active"){
        //     return  tasks.filter(task => task.isDone === false)
        // }else if(filter === "completed"){
        //     return  tasks.filter(task => task.isDone === true)
        // }
        switch (filter){
            case "completed":
               return  tasks.filter(task => task.isDone)
            case "active":
                return  tasks.filter(task => !task.isDone)
            default:
                return tasks
        }
    }

    // const TodoListTitle_2 = "What to buy"
    // const tasks_2:Array<TaskType> = [
    //     {id:4,title:"Cola",isDone:false},
    //     {id:5,title:"Chicken",isDone:true},
    //     {id:6,title:"Beer",isDone:true}
    // ]
const filteredTasks:Array<TaskType> = getFilteredTasks(tasks,filter)

    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                title={TodoListTitle}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
