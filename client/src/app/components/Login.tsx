"use client";
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import styles from './Login.module.css'
import { BACKEND_URL } from '../../../constants';
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function login(ev: FormEvent) {
    ev.preventDefault();
    const obj = {
      username: username,
      password: password
    };
    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify(obj),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
      else {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/dashboard');

      }
    }
    catch (err) {
      console.error(err);
    }
  }
  return (
    <div className={styles.login}>
      <div className='flex-col'>
        <h1 className='text-white text-center font-bold text-xl'>Please Login to your Profile !!</h1>
        <br />
        <form className='w-64' onSubmit={login}>
          <input type="text" name="username" placeholder='Patient Name' value={username} className='block w-full p-2 m-2' onChange={(ev) => { setUsername(ev.target.value) }}></input>
          <input type="password" name="password" placeholder='Password' value={password} className='block w-full p-2 m-2' onChange={(ev) => { setPassword(ev.target.value) }}></input>
          <button className='bg-blue-600 text-white block w-full m-2 p-2'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
