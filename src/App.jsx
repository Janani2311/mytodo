import React, { useState } from 'react'
import CreateTodo from './components/CreateTodo'
import TodoDropdown from './components/TodoDropdown'
import TodoCard from './components/TodoCard'


function App() {
  let [editId,setEditId] = useState(-1);
  let [displayStatus,setDisplayStatus] = useState(["All"]);

  let [data,setData]= useState([
    {
      
      id:1,
      name:"Task1",
      description:"This is my first task",
      status :"Not completed"
    },
    {
      id:2,
      name:"Task2",
      description:"This is my second task",
      status :"Not completed"
    }
  ])
  return <>
   
    <CreateTodo data={data} setData={setData} editId={editId} setEditId={setEditId}/>
    <TodoDropdown displayStatus={displayStatus} setDisplayStatus={setDisplayStatus}/>
    <TodoCard data={data} setData={setData} editId={editId} setEditId={setEditId} displayStatus={displayStatus} setDisplayStatus={setDisplayStatus}/> 
  </>
}

export default App