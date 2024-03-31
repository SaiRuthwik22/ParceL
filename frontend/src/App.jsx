import Productspage from './components/Productspage'
import ItemsDetails from './components/ItemsDetails'
import ItemContextProvider from './ItemContextProvider'
import Cart from './components/Cart'
import Header from './header'
import Footer from './Footer'




function App() {
return (
    <>
      {/* <ItemContextProvider>
        <Productspage/>
        <ItemsDetails/>
        <Cart/>
      </ItemContextProvider> */}
      <Header/>
      <Footer/>
    </>
  )
}

export default App
