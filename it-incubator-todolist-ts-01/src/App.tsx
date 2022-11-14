import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";

export type  TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"


const App = () => {

    const TodoListTitle: string = "What to learn"


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "ReactRedux", isDone: false}
    ])


    const [filter, setFilter] = useState<FilterValuesType>("all")
    console.log(filter)

    const removeTask = (taskId: number) => {
        const updateTasks = tasks.filter(task => task.id !== taskId)
        setTasks(updateTasks)
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
                changeTodoListFilter={changeTodoListFilter}/>
        </div>
    );
}

export default App;
