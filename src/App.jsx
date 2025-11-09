
import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AdminPage from './pages/AdminPage'
import CustomerPage from './pages/CustomerPage'
import FashionAndFabrics from './pages/FashionAndFabrics'
import PaymentSuccess from './pages/PaymentSuccess'
import { useAuthContext } from './context/AuthContext'
import CustomerOrder from './pages/CustomerOrder'
import Order from './pages/Orders'
import ManageCustomers from './pages/ManageCustomers'

function App() {

  const {authUser}=useAuthContext()

  return (
    <>
      
      <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={ <Signup/>}/>

          <Route path='/login' element={ <Login/>}/>
          <Route path='/adminPage' element={authUser?.data?.role==='admin'?<AdminPage/>:<Navigate to={'/login'}/>}/>
          <Route path='/customerPage' element={authUser?.data?.role==='customer'?<CustomerPage/>:<Navigate to={'/login'}/>}/>
          <Route path='/fashionAndFabric' element={authUser?.data?.role==='admin'?<FashionAndFabrics/>:<Navigate to={'/login'}/>}/>
          <Route path='/paymentSuccess' element={<PaymentSuccess/>}/>
          <Route path='/customerOrder' element={authUser?.data?.role==='customer'?<CustomerOrder/>:<Navigate to={'/login'}/>}/>
          <Route path='/order' element={authUser?.data?.role==='admin'?<Order/>:<Navigate to={'/login'}/>}/>
          <Route path='/manageCustemers' element={authUser?.data?.role==='admin'?<ManageCustomers/>:<Navigate to={'/login'}/>}/>



          <Route path="*" element={<Navigate to="/login" />} />


      </Routes>

    </>
  )
}

export default App
