import React, { useState } from 'react'
import RegisterForm from './RegisterForm'
import RegisterDone from './RegisterDone'
import "./Register.css"
import Header from '../Header/Header'

function Register() {
    
  const [formSuccess , setFormSuccess] = useState(false);
  const [user, setUser] = useState({
    uname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div id="register">
        <Header />
        {
        formSuccess ? 
            <RegisterDone 
                email={user.email}
            /> 
                    : 
            <RegisterForm 
                formSuccess={formSuccess} 
                setFormSuccess={setFormSuccess}
                user={user}
                setUser={setUser}
            /> 
        }
    </div>
  )
}

export default Register
