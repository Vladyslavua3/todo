import React, {ChangeEvent, useState} from "react";


type EditableType = {
    title:string
    onChange: (title:string) => void
}

export const EditableSpan = (props: EditableType) => {

    let[editMode,setEditMode] = useState(false)

    let[title,setTitle] = useState('');


   const activeEditMode = () => {
      setEditMode(true)
      setTitle(props.title)
   }

   const activeViewMode = () => {
       setEditMode(false)
       props.onChange(title)
   }


   const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }

    return (
        editMode?
            <input value={title} autoFocus onBlur={activeViewMode} onChange={onChangeHandler}/>
          :  <span onDoubleClick={activeEditMode}>{props.title}</span>
    )
}