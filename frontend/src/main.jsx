import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import ItemContextProvider from './ItemContextProvider.jsx'
import Shop from './components/Shop.jsx'
import Blog from './components/Blog.jsx'
import About from './About.jsx'
import Cart from './components/Cart.jsx'
import Login from './components/Login.jsx'
import User from './components/User.jsx'



const router=createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<Login/>}/>
        <Route path='/User' element={<User/>}/>
        <Route path='/Login' element={<Login/>}/>
         <Route path='/Home' element={<Home/>}/>
         <Route path='Shop' element={<Shop/>}/>
         <Route path='Blog' element={<Blog/>}/>
         <Route path='About' element={<About/>}/>
         <Route path='Cart' element={<Cart/>}/>
      </Route>
  )
)











ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ItemContextProvider>
      <RouterProvider router={router}/>
    </ItemContextProvider>
  </React.StrictMode>,
)
