import React, { useState } from 'react'
import Header from '../Header/Header'
import ForgetPasswordBox from './ForgetPasswordBox'
import './ForgetPassword.css'
import ForgetPasswordDone from './ForgetPasswordDone'

export default function ForgetPassword() {
    const [fp, setFp] = useState({
      email:"",
      generated:false
    })
  return (
    <div className='ForgetPassword'>
      <Header />
      {
        fp.generated ? 
        <ForgetPasswordDone email={fp.email}/>:
      <ForgetPasswordBox setFp={setFp}/>
      }
    </div>
  )
}
