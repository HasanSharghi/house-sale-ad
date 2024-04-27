import React from 'react'
import NotFoundImg from "../../../assets/images/notFound.png";
import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className='flex flex-col items-center font-bold text-xl my-80 space-y-6'>
      <img src={NotFoundImg} alt="Not Found" />
     
       
        <h3>چنین صفحه ای  موجود نیست !!!</h3>

        <Link to="/" className='text-mainBlue  border border-textBlue px-2 py-1 rounded-lg hover:bg-hoverBlue bg-lightBlue'>بازگشت به صفحه اصلی</Link>
    </div>
  )
}
