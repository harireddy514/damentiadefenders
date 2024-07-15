import React from 'react'
import Link from 'next/link'
const Game = (props) => {
  return (
      <div className='bg-blue-200 mr-5 ml-5 mt-3 mb-3 p-5 text-center text-blue-900 border-2 border-black'>
        <Link href={`/memorygames/${props.link}`} style={{textDecoration:'none',color:'inherit'}}>
       <h1 className=''>{props.name}</h1>
       </Link>
      </div>
  )
}

export default Game
