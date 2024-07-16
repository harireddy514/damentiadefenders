import React from 'react'
import Game from './Game'
const MemoryGames = () => {
  return (
    <div>
      <h2  className='flex justify-center text-center mt-3'>Memory Games</h2>
      <h4 className='flex justify-center text-center mt-3'>Improve Your Cognitive Ability !!</h4>
      <Game name="Recognize who?" link="guess"/>
      <Game name="Personalized Quiz" link=""/>
    </div>
  )
}

export default MemoryGames
