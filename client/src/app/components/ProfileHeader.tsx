import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const ProfileHeader = () => {
  return (
    <div>
      <div className='text-white p-4 w-full font-bold bg-blue-950 flex justify-between text-sm'>
       {/* <div className={styles.profheader}> */}
       <h3>Profile</h3>
       <AccountCircleIcon />
    </div>
    </div>
  )
}

export default ProfileHeader
