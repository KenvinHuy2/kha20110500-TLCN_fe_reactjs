import React from 'react'
import './styles.scss'
import CustomCard from '../../components/custom-card/CustomCard'

function Drinks() {

  return (

    <div className='drinks'>
      <div className='title'>THỨC UỐNG</div>
      <div className='drinks-container'>
        <CustomCard/>
        <CustomCard/>
        <CustomCard/>
        <CustomCard/>
        <CustomCard/>
      </div>
      
    </div>
  )
}

export default Drinks