import { Routes, Route } from 'react-router-dom';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import EmailVerificationPage from '../pages/EmailVerificationPage';

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <Routes>
        <Route path='/' element={"Home"} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verifyEmail' element={<EmailVerificationPage />} />
      </Routes>
    </div>
  )
}

export default App
