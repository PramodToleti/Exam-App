import { Route, Switch } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Dashboard from "./components/Student/Dashboard"
import Login from "./components/Student/Login"
import Signup from "./components/Student/Signup"
import AuthRedirect from "./components/Student/AuthRedirect"
import Exams from "./components/Student/Exams"
import ForgotPassword from "./components/Student/ForgotPassword"
import ConfirmPassword from "./components/Student/ConfirmPassword"
import ResetPassword from "./components/Student/ResetPassword"
import ProtectedRoute from "./components/Student/protectedroute"

function App() {
  return (
    <>
      <Toaster />
      <Switch>
        <Switch>
          <ProtectedRoute exact path="/" component={AuthRedirect} />
          <Route path="/student/login" component={Login} />
          <Route path="/student/signup" component={Signup} />
          <Route path="/student/forgot-password" component={ForgotPassword} />
          <Route
            path="/student/confirm-reset-password"
            component={ConfirmPassword}
          />
          <Route path="/student/reset-password" component={ResetPassword} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/exams" component={Exams} />
          <Route path="*" component={() => <h1>404 Not Found</h1>} />
        </Switch>
      </Switch>
    </>
  )
}

export default App
