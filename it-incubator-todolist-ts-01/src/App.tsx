import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";

export type  TaskType = {
    id:number
    title: string
    isDone: boolean
}



const App = () => {

    const TodoListTitle:string = "What to learn"


    const tasks:Array<TaskType> = [
        {id:1,title:"HTML & CSS",isDone:true},
        {id:2,title:"JS",isDone:true},
        {id:3,title:"React",isDone:true},
        {id:4,title:"ReactRedux",isDone:false}
    ]

    // const TodoListTitle_2 = "What to buy"
    // const tasks_2:Array<TaskType> = [
    //     {id:4,title:"Cola",isDone:false},
    //     {id:5,title:"Chicken",isDone:true},
    //     {id:6,title:"Beer",isDone:true}
    // ]


    return (
        <div className="App">
            <TodoList title={TodoListTitle} tasks={tasks}/>
        </div>
    );
}

export default App;
