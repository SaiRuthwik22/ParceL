import React, { useContext, useState } from 'react'
import ItemContext from './ItemContext'



function ItemContextProvider({children}) {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const[user,setUser] =useState({})
 

  return (
    <ItemContext.Provider value={{isLoggedIn,setIsLoggedIn,user,setUser}}>
        {children}
    </ItemContext.Provider>
  )
}

export default ItemContextProvider
export const useItem = () =>(useContext(ItemContext))
