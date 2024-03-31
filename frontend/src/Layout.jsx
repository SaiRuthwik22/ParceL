import React from 'react'
import Header from './header'
import Footer from './Footer'
import {Outlet} from 'react-router-dom'
import ItemContext from './ItemContext'
import { useContext } from 'react'

function Layout() {
  const {isLoggedIn} = useContext(ItemContext)
  return (
    <>
      {isLoggedIn?<Header/>:""}
      <Outlet/>
      {isLoggedIn?<Footer/>:""}
    </>
  )
}

export default Layout
