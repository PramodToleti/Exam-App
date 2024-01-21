import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Dashboard from "./components/Student/Dashboard"
import Login from "./components/Student/Login"
import Signup from "./components/Student/Signup"
import AuthRedirect from "./components/Student/AuthRedirect"
import Exams from "./components/Student/Exams"
import ForgotPassword from "./components/Student/ForgotPassword"
import ConfirmPassword from "./components/Student/ConfirmPassword"
import ResetPassword from "./components/Student/ResetPassword"

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/student/login" element={<Login />} />
          <Route path="/student/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/student/confirm-reset-password"
            element={<ConfirmPassword />}
          />
          <Route path="/student/reset-password" element={<ResetPassword />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
