import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemType = {
    addItem:(title: string) => void
}


export const AddItemForm = (props:AddItemType) => {
    const [newTitle, setNewTitle] = useState('');
    const [error,setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTittle = newTitle.trim()
        if (trimmedTittle) {
            props.addItem(trimmedTittle)
        }else {setError(true)}
        setNewTitle('')
    }


    const onEnterTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }


    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTitle(e.currentTarget.value)
    }


    return (
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
    )
}