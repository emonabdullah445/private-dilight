import React from 'react'
import LoginUpdateForm from '../components/SecondLoginForm'
import Footer from '../components/Footer'
import Header from '../components/Header'

const login = () => {
  return (
    <div>
      <Header />
      <LoginUpdateForm />
      <Footer />
    </div>
  )
}

export default login