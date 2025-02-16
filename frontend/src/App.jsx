//import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage.jsx'
import LogInPage from './pages/LogInPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import {Loader} from "lucide-react";


const App = () => {
 const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

 useEffect (()=>{
  checkAuth()
 }, [checkAuth]);
 console.log({authUser});

 if(isCheckingAuth && !authUser) return(
  <div className="flex items-center justify-center h-screen">
    <Loader className="size-10 animate-spin"/>
  </div>
 )
  return (
    <div >
      <Navbar/>
        <Routes>
          <Route path="/" element={authUser ? <HomePage/>: <navigate to ="/login"/>}/>
          <Route path="/signup" element={!authUser ? <SignUpPage/>: <navigate to ="/"/>}/>
          <Route path="/login" element={!authUser ? <LogInPage/>: <navigate to ="/"/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/profile" element={authUser ? <ProfilePage/>: <navigate to ="/login"/>}/>
        </Routes>
    </div>
  )
}

export default App;