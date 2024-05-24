import './App.css';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './context/authContext';


function App() {
  const {authUser} = useAuthContext();

  return (
      <div className="p-4 h-screen flex items-center justify-center">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={authUser? <Home /> : <Navigate to='/login' />} />
              <Route path="login" element={authUser? <Navigate to='/' /> : <Login />} />
              <Route path="signup" element={authUser? <Navigate to = '/' /> : <SignUp />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
