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


type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {

    const removeTask = (taskId: string,todoListId:string) => {
        let tasks = tasksObj[todoListId]
        const updateTasks = tasks.filter(task => task.id !== taskId)
        tasksObj[todoListId] = updateTasks
        setTasks({...tasksObj})
    }

    const addTask = (title: string,todoListId:string) => {
        const tasks = tasksObj[todoListId]
        const newTasks = [{id: v1(), title, isDone: false},...tasks]
        tasksObj[todoListId] = newTasks;
        setTasks({...tasksObj})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean,todoListId:string) => {
        const tasks = tasksObj[todoListId]
        const task = tasks.find(t => t.id === taskId)
        if(task){
            task.isDone = isDone;
            setTasks({...tasksObj})
        }
    }

    const changeTodoListFilter = (nextFilterValue: FilterValuesType,toDoId:string) => {
            let todolist = todoLists.find(tl => tl.id === toDoId)
            if(todolist){
                todolist.filter = nextFilterValue
                setToDoList([...todoLists])
            }
    }


    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks
        }
    }

    const todoListId1 = v1();
    const todoListId2 = v1();


    const [todoLists,setToDoList]= useState<TodoListType[]>([
        {
            id: todoListId1,
            title: 'What to learn',
            filter: "active"
        },
        {
            id: todoListId2,
            title: 'What to buy',
            filter: "completed"
        }
    ])

    const removeToDoList = (todoListId: string) => {
        const filteredToDo = todoLists.filter(t => t.id !== todoListId)
        setToDoList(filteredToDo)
        delete tasksObj[todoListId]
        setTasks(tasksObj)
    }


    const [tasksObj,setTasks] = useState({
        [todoListId1]:[
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "ReactRedux", isDone: false}
        ],
        [todoListId2]:[
            {id: v1(), title: "Coca-Cola", isDone: false},
            {id: v1(), title: "Salmon", isDone: true},
        ]
    })

    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    const filteredTasks: Array<TaskType> = getFilteredTasks(tasksObj[tl.id], tl.filter)
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        tasks={filteredTasks}
                        title={tl.title}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        addTask={addTask}
                        filter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                        removeToDoList={removeToDoList}
                    />
                })
            }
        </div>
    );
}

export default App;
