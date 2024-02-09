import React, { useContext, useEffect } from 'react'
import Header from '../Header/Header'
import Main from "../Main-Section/Main"
import ParticleAnimation from './Background';
import UserContext from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import "./Home.css"

export default function Home() {
  const navigate = useNavigate();
  const {user , setUser} = useContext(UserContext);
  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
      return ;
    }
    if(!user)
    {
      setTimeout(()=>{
        if(storedUser)
        {
          return
        }
        navigate("/login")
      },10000)
    }
  },[navigate , user , setUser])

  return (
    <>
      <ParticleAnimation />
      <Header />
      <Main />
    </>
  )
}
