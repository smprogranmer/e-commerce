import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navber/Navber';
import Footer from './components/Footer/Footer';
import { server } from './constants/config';
import { getUser, login } from './service/user.service';
import { userExists, userNotExists } from './redux/reducers/auth';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/auth/ProtectRoute';
import Loader from './components/loader/Loader';
import Abaya from './pages/productsByCategory/Abaya';
import ChangePassword from './pages/Login/ChangePassword';
import Orders from './pages/orders/Orders';

// const Login = lazy(() => import('./pages/Login/Login'));
const Home = lazy(() => import('./pages/home/Home'));
const Register = lazy(() => import('./pages/Login/Register'));
// const Products = lazy(() => import('./pages/products/Products'));
const ProductsDetailse = lazy(() => import('./pages/productsDettlse/ProductsDetailse'));
const Borka = lazy(() => import('./pages/productsByCategory/Borka'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const CheckOut = lazy(() => import('./pages/checkOut/CheckOut'));


const App = () => {
  const {user,loader} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  useEffect(() => {
    getUser()
    .then((res) => dispatch(userExists(true)))
    .catch((err) => dispatch(userNotExists()))

  }, [])
  const [cureentForm,setCureentForm] = useState('Login')
  console.log(server)

  const toggleForm = (formName) =>{
    setCureentForm(formName)
  }
  return loader ? (<Loader/>) : (
      <BrowserRouter>
      <Navbar />
      <Suspense fallback={<Loader/>}>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/abaya' element={<Abaya/>}/>
        {/* <Route path='/login' element={cureentForm  === 'Login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />} /> */}
        <Route path='/singup' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/change-password' element={<ChangePassword/>}/>
        <Route path='/products-details/:id' element={<ProductsDetailse/>}/>
        <Route path='/cart' element={ <ProtectedRoute isLoading={loader} user={user}><Cart/></ProtectedRoute>}/>
        <Route path='/borka' element={<Borka/>}/>
        <Route path='/checkout' element={<CheckOut/>}/>
        <Route path='/my-orders' element={<Orders/>}/>
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )

}

export default App