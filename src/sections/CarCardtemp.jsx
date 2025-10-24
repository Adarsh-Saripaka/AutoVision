import React from 'react'
import './CarCardtemp.css'
const CarCardtemp = ({name,brand,price,feature,image}) => {
  return (
    <div className='CarCard'>
      <div className='car-section'>
        <h2 id='CarName'>{name}</h2>
        <img src={image} alt={name} className='car-img'/>
        <p id='brand'>Brand Name: {brand}</p>
        <p id='price'>Price: {price}</p>
        <p id='feature'>Feature: {feature}</p>
        <button className='details-btn'>View Details</button>
      </div>
    </div>
  )
}

export default CarCardtemp;
