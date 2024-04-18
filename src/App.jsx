// eslint-disable-next-line no-unused-vars
import React from 'react'
import{Routes, Route} from 'react-router-dom'

import Page from './Login-Register/Page'
import Home from './Home/Home'
import NavBar from './NavBar/NavBar'
import EmptyPage from './EmptyPage/EmptyPage'
import Admin from './AdminPage/Admin'
import UserTable from './AdminPage/usersTable/UsersTable.jsx'
import AdminTable from './AdminPage/adminTable/AdminTable.jsx'
import OrdersTable from './AdminPage/ordersTable/OrdersTable.jsx'
import ProductsTable from './AdminPage/productsTable/ProductsTable.jsx'
import SellersTable from './AdminPage/sellersTable/SellersTable.jsx'
function App() {
  return (
    <>
        <Routes>
            <Route path='/nav' element={<NavBar />} />
            <Route path='/Home' element={<Home />} />
              
            {/* default page */}
            <Route path='/' element={<Page />} />

            {/* unknown url */}
            <Route path='*' element={<EmptyPage />}/>
            
            {/* admin */}
            <Route path='/basics-admin-panel' element={<Admin />} >
              <Route path='admin' element={<AdminTable />} />
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