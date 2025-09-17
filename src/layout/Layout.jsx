import React from 'react'
import { Box } from '@mui/material'
import Footer from './Footer'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <Box >
        <Navbar/>
       <Outlet/>
        <Footer/>
    </Box>
  )
}

export default Layout