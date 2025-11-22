import React from 'react'
import useOnline from '../hooks/useOnline'
const Footer = () => {
 
  return (
    <div className='footerr'>
    FoodHunt, made by{' '}
    <a
      href='https://lookshd.github.io/Abhishek-Mishra-Portfolio/'
      target={'_blank'}
      className='text-orange-500'
    >
      Abhishek Mishra
    </a>
  </div>
  )
}

export default Footer