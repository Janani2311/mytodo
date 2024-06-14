import React, { useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {findIndexById} from './Utils/Helper';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function TodoCard({data,setData,editId,setEditId,displayStatus,setDisplayStatus}) {

    let [displayData,setDisplayData]=useState([...data]);
    let option = "";
    let [showStatus,setShowStatus]=useState("");
    
  
    useEffect(()=>{
      display();
    } ,[displayStatus,data])



    function display(){
      if(displayStatus == "All"){
        (data.length==0)?setShowStatus("No task created"):setShowStatus("")
        displayData=[...data];
        setDisplayData(displayData);
        
      }
      else if(displayStatus == "completed"){
        
        let completedData = data.filter((e) => {          
          return e.status == "completed";
        })
        displayData=[];
        
        (completedData.length==0)?setShowStatus("No completed task"):setShowStatus("")
        
        displayData=[...completedData];
        setDisplayData(displayData);
        
      }
      else if(displayStatus == "Not completed"){
        let notCompletedData = data.filter((e) => {
          return e.status == "Not completed";
        })
        displayData=[];
        
        (notCompletedData.length==0)?setShowStatus("No Notcompleted task"):setShowStatus("")
        displayData=[...notCompletedData];
        setDisplayData(displayData);
      }
    }

    const handleDelete = (id)=>{
      let index = findIndexById(data,id)
      if(index !== -1){
          let newArray = [...data] // deep copy to acheieve immutability
          newArray.splice(index,1)
          setData(newArray);
      }
      else{
          console.error("Invalid Id");
      }
    }

    const handleSelect=(e,id)=>{

      let index = findIndexById(data,Number(id));
      if(index!==-1)
      {
        data[index].status=e;
        
        let editedData = {
          id:id,
          name:data[index].name,
          description:data[index].description,
          status:data[index].status
        }//forming the object
  
          let newArray = [...data]//deep copy
          newArray.splice(index,1,editedData)//replace the old data with edited data
          setData(newArray)
          
      }
      else
      {
          console.error(`Invalid Id: ${id}`)
      }
      
    }
  
  return <>   
        
        
        <div className='card-wrapper'>
        <h3>{showStatus}</h3>
         
          {
            displayData.map((e,i) => {
              {(e.status == "Not completed")? option = "completed": option = "Not completed"}
            return  <div className='my-card' key={i}>
              <Card style={{ width: '18rem',height:'250px' }}>
              <Card.Body>
              <Card.Subtitle className="mb-4 text-muted">Name:&nbsp;&nbsp;
              {e.name}
              </Card.Subtitle>
          
              <Card.Subtitle className="mb-4 text-muted">Description:&nbsp;&nbsp;
              {e.description}
              </Card.Subtitle>
        
              <Card.Text className="mb-4 text-muted status">Status:
              
                  <DropdownButton id="dropdown-basic-button" title={`${e.status}`}
                   className = {(e.status == "Not completed")?"not-completed":"completed"}
                   onSelect={(event)=>handleSelect(event,e.id)}>
                    
                    <Dropdown.Item eventKey={`${option}`}>{option}</Dropdown.Item>
                  </DropdownButton>

              
              </Card.Text>
              <p className="card-button">
              <Button className='edit-card-button' onClick={()=>setEditId(e.id)}>Edit</Button>
              <Button className="delete-button" onClick={()=>handleDelete(e.id)}>Delete</Button>
              </p>
              </Card.Body>
              </Card>
              </div>
            })
          }
         
          
                
    </div>
  
  </>
}

export default TodoCard