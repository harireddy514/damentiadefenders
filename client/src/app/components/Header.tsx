import React from 'react'
import Link from 'next/link'
const Header = () => {
  return (
    <div className='text-white p-3 w-full font-bold bg-blue-950 flex justify-between text-lg'  >
      <h3 className='pt-2'><Link href="/" style={{textDecoration:'none',color:'inherit'}}>Dementia Defenders</Link></h3>
      <div>
        <h3 className='text-center block p-2 float-right'><Link href="/register" style={{textDecoration:'none',color:'inherit'}} >Register</Link></h3>
        <h3 className='text-center block p-2 float-right'><Link href="/login" style={{textDecoration:'none',color:'inherit'}}>Login</Link></h3>
        </div>
    </div>
  )
}

export default Header
