import toast from "react-hot-toast"
import { useHistory } from "react-router-dom"

const Dashboard = () => {
  const history = useHistory()
  const handleLogout = async () => {
    try {
      const options = {
        method: "GET",
        credentials: "include",
      }

      const response = await fetch(
        "http://localhost:9001/api/student/logout",
        options
      )

      if (response.ok) {
        toast.success("Logged out successfully")
        history.replace("/student/login")
      } else {
        toast.error("Something went wrong")
        const result = await response.json()
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="flex justify-between items-center px-12 py-2  shadow-md">
      <h1>Dashboard</h1>
      <button
        type="button"
        className="bg-blue-600 text-white text-md p-1 border rounded-md outline-none h-10 w-20"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default Dashboard
