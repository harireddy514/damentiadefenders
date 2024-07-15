"use client"
import React from "react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
interface User {
  id: string;
  accessToken: string;
 }
const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      console.log(user);
      console.log(user.accessToken);
      setUser(user);
      setToken(token);
    }
  }, []);
  
  return (
      <div>
      <main className="ml-20"></main>
    </div>
  );
};
export default Dashboard;
