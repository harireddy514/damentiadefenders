'use client'
import React, { useState } from 'react'

const InputTask = (props:any) => {
    const [item,setItem]=useState({
        task:"",
        time:""
    });
    function onchange(e:any) {
      const {name,value}=e.target;
      setItem({...item,[name]:value});
    }
    function onclick(e:any) {
      props.addTask(item);
      setItem({
        task:"",
        time:""
      })
      e.preventDefault();
    }
  return (
    <div>
       <form>
        <div className='mb-3'>
       <input type="text" name="task" className="form-control" onChange={onchange} placeholder="Enter the task:" value={item.task}/>
       <input type="text" name="time" className="form-control" onChange={onchange} placeholder="Enter the Time slot for the task:" value={item.time}/>
       <button onClick={onclick} className='btn btn-primary'>Add task</button>
       </div>
       </form>
      
    </div>
  )
}

export default InputTask
