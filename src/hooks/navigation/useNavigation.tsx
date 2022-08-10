import { ReactNode } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { AuthLayout } from '../../components/layouts/auth.layout'

import { CodeVerification } from '../../pages/auth/CodeVerification'
import { SignIn } from '../../pages/auth/SignIn'
import { Dashboard } from '../../pages/dashboard/Dashboard'
import { DashboardWelcome } from '../../pages/dashboard/DashboardWelcome'

import { selectAccessToken } from '../../redux/auth/auth.selectors'
import { useAppSelector } from '../redux/useRedux'

export const useNavigation = () => {
  const token = useAppSelector(selectAccessToken)

  const checkAuth = (element: ReactNode) => {
    if (!token) return <Navigate to='/auth/signin' />

    return element
  }

  return (
    <Routes>
      <Route path='/' element={checkAuth(<Dashboard />)} />

      <Route path='/auth' element={<AuthLayout />}>
        <Route path='signin' element={<SignIn />} />
        <Route path='code' element={<CodeVerification />} />
      </Route>

      <Route path='/dashboard' element={checkAuth(<Dashboard />)} />
      <Route
        path='/dashboard/welcome'
        element={checkAuth(<DashboardWelcome />)}
      />
    </Routes>
  )
}
