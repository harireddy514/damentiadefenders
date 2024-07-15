"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
interface User {
 id: number;
 username: string;
}
export default function Show() {
 const [user, setUser] = useState<User | null>(null);
 const [token, setToken] = useState<string | null>(null);
 const router = useRouter();
 useEffect(() => {
   const token = localStorage.getItem('token');
   if (!token) {
     router.push('/login');
   } else {
     const user = JSON.parse(localStorage.getItem('user') || 'null');
     setUser(user);
     setToken(token);
   }
 }, []);
 if (!user) {
   return <div>Loading...</div>;
 }
 return (
<div>
<h1>User Details</h1>
<p><strong>Username:</strong> {user.username}</p>
<p><strong>User ID:</strong> {user.id}</p>
<p><strong>Token:</strong> {token}</p>
<button
       onClick={() => {
         localStorage.removeItem('token');
         localStorage.removeItem('user');
         router.push('/login');
       }}
>
       Logout
</button>
</div>
 );
}
