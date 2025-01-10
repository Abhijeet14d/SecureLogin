import { Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import LoadingSpinner from './components/LoadingSpinner';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

// protect routes that require authentication

const ProtectedRoute = ({children}) =>{
  const { isAuthenticated, user } = useAuthStore();
  if(!isAuthenticated){
    return <Navigate to='/login' replace />
  }
  if(!user.isVerified){
    return <Navigate to='/verifyEmail' replace />
  }
  return children;
}

// redirect authenticated users to the home page

const RedirectAuthenticatedUser = ({children}) =>{
  const { isAuthenticated, user } = useAuthStore();
  if(isAuthenticated && user.isVerified){
    return <Navigate to='/' replace />
  }
  return children;
}

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  if(isCheckingAuth) return <LoadingSpinner />
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <Routes>
        <Route path='/' element={<ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>} />
        <Route path='/signup' element={<RedirectAuthenticatedUser>
          <SignupPage />
          </RedirectAuthenticatedUser>} />
        <Route path='/login' element={<RedirectAuthenticatedUser>
          <LoginPage />
          </RedirectAuthenticatedUser>} />
        <Route path='/verifyEmail' element={<EmailVerificationPage />} />
        <Route path='/forgotPassword' element={<RedirectAuthenticatedUser>
          <ForgotPasswordPage />
        </RedirectAuthenticatedUser>} />
        <Route path='/resetPassword/:token' element={<RedirectAuthenticatedUser>
          <ResetPasswordPage />
        </RedirectAuthenticatedUser>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
