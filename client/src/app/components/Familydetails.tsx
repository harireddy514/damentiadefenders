'use client'
import React from 'react'
import Familyform from './Familyform';
import { useState } from 'react';
import { BACKEND_URL } from '../../../constants';
const Familydetails = () => {
  const [FamilyMembers, setFamilyMembers] = useState<any[]>([]);
  function addMember(member: any) {
    setFamilyMembers([...FamilyMembers, member]);
  }
  async function onclick(event: any) {
    event.preventDefault();
    console.log(FamilyMembers);
    try {
      const formData = new FormData();
      Object.keys(FamilyMembers).forEach((memberKey: any) => {
        const familyMember = FamilyMembers[memberKey];
        Object.keys(familyMember).forEach((fieldKey: any) => {
          if (fieldKey !== 'f_pic') {
            formData.append(`FamilyDetails[${memberKey}][${fieldKey}]`, familyMember[fieldKey]);
          } else {
            familyMember.f_pic.forEach((image: any, imageIndex: any) => {
              formData.append(`FamilyDetails[${memberKey}][${fieldKey}]`, image);
            })
          }
        })
      })

      console.log(formData);
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/api/familydetails`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        alert("Family Members Details saved");
      }
      else
        console.log("Error sending data to server");
    }
    catch (err) {
      console.error("Network error:", err);
    }
  }

  return (
    <div className='justify-center'>
      <h4>Family Members/ Caregivers Details Form:</h4>
      <Familyform onAdd={addMember} />
      <button onClick={onclick} className='btn btn-primary'>Click Me when All Members are Added !!</button>
    </div>
  )
}

export default Familydetails
