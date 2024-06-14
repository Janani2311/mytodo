import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { findIndexById } from './Utils/Helper';




function CreateTodo(props) {
  let data = props.data;
  let setData = props.setData;
  let selectedId = props.editId;
  let setSelectedId = props.setEditId;
  let [inputName,setInputName] = useState('');
  let [inputDescription, setInputDescription] = useState('');
  
  
  
  let [name,setName] = useState("");
  let [description,setDescription] = useState("");
  let [status,setStatus] = useState("Not completed");
  

  function addTodo(){
    
      let id = data.length? data[data.length-1].id+1:1;
      let newUser = {
        id,
        name,
        description,
        status
      }
  
      let newArray = [...data];//deep copy
      newArray.push(newUser);//add user
      setData(newArray);// update state
      
      setDescription(" ");
      setName(" ");
      
  }
  
  useEffect(()=>{
      if(selectedId > 0){

        let index = findIndexById(data,selectedId)
        setInputName(data[index].name);
        setInputDescription(data[index].description);
       
      }else{

        setName('');
        setDescription('');
        
      }
  } ,[selectedId])


  function editTodo(){
    let index = findIndexById(data,selectedId);
    data[index].name  = inputName;
    data[index].description = inputDescription;
    
    
      let editedData = {
        id:selectedId,
        name:data[index].name,
        description:data[index].description,
        status:data[index].status
      }//forming the object

        let newArray = [...data]//deep copy
        newArray.splice(index,1,editedData)//replace the old data with edited data
        setData(newArray)
        initialize();

        

  }
  
  function initialize(){
    setSelectedId(-1);
    
  }
  
  return <>
        {(selectedId > 0)?
        
        
          <div className="create-todo">
          <div className='todo-heading'><h3>My todo</h3></div>
          <div className="wrapper">
              <div className='mb-2'><Form.Control type="text" placeholder="Todo Task"  value={inputName} onChange={(e)=> setInputName(e.target.value)}/></div>
              <div className='mb-2'><Form.Control type="text" placeholder="Todo Description"  value={inputDescription} onChange={(e)=> setInputDescription(e.target.value)}/></div>
              <div className='edit-button'><Button onClick={editTodo}>Edit Todo</Button></div>
          </div>
          </div> 
       
          
          :
          <div className="create-todo">
              <div className='todo-heading'><h3>My todo</h3></div>
              <div className="wrapper">
                  <div className='mb-2'><Form.Control type="text" placeholder="Todo Task"  value={name} onChange={(e)=> setName(e.target.value)}/></div>
                  <div className='mb-2'><Form.Control type="text" placeholder="Todo Description" value={description} onChange={(e)=> setDescription(e.target.value)} /></div>
                  <div className='add-button'><Button onClick={addTodo}>Add Todo</Button></div>
              </div>
          </div>
        }   
  </>
}

export default CreateTodo

