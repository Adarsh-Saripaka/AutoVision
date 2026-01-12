import React from 'react'
import './CarCardtemp.css'
const CarCardtemp = ({name,brand,price,feature,image}) => {
  return (
    <div className='CarCard'>
      <div className='car-section'>
        <h2 className='CarName'>{name}</h2>
        <img src={image} alt={name} className='car-img'/>
        <p className='brand'>Brand Name: {brand}</p>
        <p className='price'>Price: {price}</p>
        <p className='feature'>Feature: {feature}</p>
        <button className='details'>View Details</button>
      </div>
    </div>
  )
}

export default CarCardtemp;
