import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './components/Home'
import Registration from './components/Registration'
import Login from './components/Login'
import LeaderBoard from './components/LeaderBoard'
import { useAuth } from './context/authcontext'

const ProtectedRoute=({children})=>{
    const {user}=useAuth()
    return user ? children: <Navigate to='/login'/>
}

const App=()=>{
  
  return (
    <Routes>
      <Route path='/register' element={<Registration />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/leaderBoard' element={<ProtectedRoute><LeaderBoard /></ProtectedRoute>} />
    </Routes>
  )
}

export default App;
