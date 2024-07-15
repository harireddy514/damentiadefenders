'use client'
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
const Task = (props:any) => {
  const [isToggle, setIsToggle]=useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsToggle(false);
    }, 24 * 60 * 60 * 1000); 

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);
  return (
    <div  style={(isToggle) ? {backgroundColor:'lightblue'} :{backgroundColor:'white'} }>
      <div className='flex justify-between align-center'>
      <h4 style={(isToggle) ? {backgroundColor:'lightblue'} :{backgroundColor:'white'} } className='text-blue-800'>{props.task}</h4>
      <Button variant="outlined" startIcon={<CheckIcon />} className='float-right mr-2' onClick={()=>{setIsToggle(!isToggle)}}>
        Complete
      </Button>
      </div>
      <h6 className='text-blue-700'>{props.time}</h6>
    </div>
  )
}

export default Task
