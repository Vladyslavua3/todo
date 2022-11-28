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
        setTasks([{id:v1(),title,isDone:false},...tasks])
    }

    const changeTaskStatus = (taskId:string,isDone:boolean) => {
        setTasks(tasks.map(t => t.id === taskId ?{...t, isDone: isDone}: t))
    }

    const changeTodoListFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    }




    const getFilteredTasks = (tasks:Array<TaskType>,filter:FilterValuesType):Array<TaskType> => {
        switch (filter){
            case "completed":
               return  tasks.filter(task => task.isDone)
            case "active":
                return  tasks.filter(task => !task.isDone)
            default:
                return tasks
        }
    }

const filteredTasks:Array<TaskType> = getFilteredTasks(tasks,filter)

    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                title={TodoListTitle}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                filter={filter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
