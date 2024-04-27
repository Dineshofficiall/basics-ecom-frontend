// eslint-disable-next-line no-unused-vars
import React from 'react'
import{Routes, Route} from 'react-router-dom'

import Page from './Login-Register/Page'
import Home from './Home/Home'
import Product from './Product/Product.jsx'
import NavBar from './NavBar/NavBar'
import EmptyPage from './EmptyPage/EmptyPage'
import Admin from './AdminPage/Admin'
import UserTable from './AdminPage/usersTable/UsersTable.jsx'
// import AdminTable from './AdminPage/adminTable/AdminTable.jsx'
import OrdersTable from './AdminPage/ordersTable/OrdersTable.jsx'
import ProductsTable from './AdminPage/productsTable/ProductsTable.jsx'
import SellersTable from './AdminPage/sellersTable/SellersTable.jsx'
import Footer from './Footer/Footer.jsx'
import ProductDetailPage from './ProductDetailPage/ProductDetailPage.jsx'
function App() {
  return (
    <>
        <Routes>
            {/* NavBar */}
            <Route path='/nav' element={<NavBar />} />

            {/* Home */}
            <Route path='/Home' element={<Home />} />

            {/* Product */}
            <Route path='/product' element={<Product />} />

            {/* Product/name */}
            <Route path='/product/:name' element={<Product />} />

            {/* ProductDetails */}
            <Route path='/productDetails/:id' element={<ProductDetailPage />} />
              
            {/* default page */}
            <Route path='/' element={<Page />} />

            {/* unknown url */}
            <Route path='*' element={<EmptyPage />}/>

            {/* Footer*/}
            <Route path='/foot' element={<Footer />} />
            
            {/* admin */}
            <Route path='/basics-admin-panel' element={<Admin />} >
              {/* <Route path='admin' element={<AdminTable />} /> */}
              <Route path='users' element={<UserTable />} />
              <Route path='orders' element={<OrdersTable />} />
              <Route path='products' element={<ProductsTable />} />
              <Route path='sellers' element={<SellersTable />} />
            </Route>
        </Routes>
    </>
  )
}

export default App