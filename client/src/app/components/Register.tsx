"use client";
import React, { useState } from 'react'
import styles from './Register.module.css'
import {useRouter} from 'next/navigation'
import { BACKEND_URL } from '../../../constants';
const Register = () => {
    const [username, setUsername]=useState("");
    const [phone, setPhone]=useState("");
    const [emergencyPhone, setemergencyPhone]=useState("");
    const [password, setPassword]=useState("");
    const router = useRouter();
    async function register(ev:any) {
        ev.preventDefault();
        // console.log(username)
        const obj={
        Patient_Name:username,
        Patient_Phone:phone,
        Emergency_Phone:emergencyPhone,
        Password:password
        };
        try {
        const response=await fetch(`${BACKEND_URL}/api/register`,{
          method:"POST",
          headers:{"Content-Type":"application/JSON"},
          body:JSON.stringify(obj)
        });
        if(!response.ok) {
          throw new Error("Error sending data to server");
        }
        else {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/login');
        }
        }
        catch(err) {
          console.error(err);
        }
    }
  return (
    <div className={styles.register}>
      <div className='flex-col'>
      <h1 className='text-black text-center font-bold text-xl'>Registration Form</h1>
      <br/>
      <form className='w-64' onSubmit={register}>
        <input type="text" name="username" placeholder='Patient Name' value={username} className='block w-full p-2 m-2' onChange={(ev)=>{setUsername(ev.target.value)}}></input>
        <input type="tel" name="phone" placeholder='Patient Phone Number' value={phone} className='block w-full p-2 m-2' onChange={(ev)=>{setPhone(ev.target.value)}}></input>
        <input type="tel" name="emergency_phone" placeholder='Emergency Phone Number' value={emergencyPhone} className='block w-full p-2 m-2' onChange={(ev)=>{setemergencyPhone(ev.target.value)}}></input>
        <input type="password" name="password" placeholder='Password' value={password} className='block w-full p-2 m-2' onChange={(ev)=>{setPassword(ev.target.value)}}></input>
        <button className='bg-blue-600 text-white block w-full m-2 p-2'>Register</button>
      </form>
      </div> 
    </div>
  )
}

export default Register
