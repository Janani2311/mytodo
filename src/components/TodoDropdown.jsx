import React from 'react'
import Form from 'react-bootstrap/Form';


function TodoDropdown({displayStatus,setDisplayStatus}) {
    let data = ["All","completed","Not completed"];

    function handleChange(value){
        setDisplayStatus(value);
    }
  return <>
         <div className='top-head'>
            <div className='col-md-8'><h3>My Todos</h3></div>
            <div className='col-md-4 d-flex align-items-center'>
              <div className><h5>Status Filter:&nbsp;</h5></div>
              <div className="filter-dropdown">
                <Form.Select onChange={(event) => handleChange(event.target.value)}>
                  {data.map((e,i) => {
                    return <option key={i} value={e}>{e}</option>
                  })}
                </Form.Select>
              </div>
            </div>
        </div>  
  
  </>
}

export default TodoDropdown

