import React from 'react';
import Deposit from './Pages/Deposit/Deposit';
import Product from './Pages/Product/Product';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Account from './Pages/Account/Account';
import CurrencyExchange from './Pages/CurrencyExchange/CurrencyExchange.jsx';
import ShoppingArea from './Pages/ShoppingArea/ShoppingArea.jsx';
import Favorite from './Pages/Favorite/Favorite.jsx';
import Principal from './Pages/Principal/Principal.jsx';
import RegisterAdmin from './Pages/RegisterAdmin/RegisterAdmin.jsx';
import Transaction from './Pages/Transaction/Transaction.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import PrincipalAdmin from './Pages/PrincipalAdmin/PrincipalAdmin.jsx';
import PrincipalChange from './Components/PrincipalChange/PrincipalChange.jsx';

export const routes = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/InnovaBank/Register',
    element: <Register />
  },
  {
    path: '/InnovaBank/Deposits',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <Deposit />
      </ProtectedRoute>
    )
  },
  {
    path: '/Innovabank/Account',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <Account />
      </ProtectedRoute>
    )
  },
  {
    path: '/Innovabank/Product',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <Product />
      </ProtectedRoute>
    )
  },
  {
    path: '/Innovabank/CurrencyExchange',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <CurrencyExchange />
      </ProtectedRoute>
    )
  },
  {
    path: '/Innovabank/ShoppingArea',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <ShoppingArea />
      </ProtectedRoute>
    )
  },
  {
    path: '/Innovabank/Favorite',
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <Favorite />
      </ProtectedRoute>
    )
  },
  {
    path: '/Innovabank/Principal',
    element: (
      <PrincipalChange allowedRoles={['user']}>
        <Principal />
      </PrincipalChange>
    )
  },
  {
    path: '/Innovabank/registerAdmin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <RegisterAdmin />
      </ProtectedRoute>
    )
  },
  {
    path: '/Innovabank/Transaction',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Transaction />
      </ProtectedRoute>
    )
  },
  {
    path: '/unauthorized',
    element: <div>No tienes acceso a esta página</div>
  },
  {
    path: '/Innovabank/PrincipalAdmin',
    element: <PrincipalAdmin/>
  }
];
