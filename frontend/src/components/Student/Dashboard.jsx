import { Link } from "react-router-dom"
import Navbar from "./Navbar"

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <section className="bg-slate-100 dark:bg-gray-900 py-4 md:py-10 min-h-screen">
      <div className="container mx-auto px-4">
        <Navbar />

        <h1 className="text-2xl font-medium text-gray-800 dark:text-white md:text-3xl mt-10">
          Welcome back, {user?.username ?? "User"} 👋
        </h1>

        <div className="text-gray-800 dark:text-white">
          <h2 className="text-xl font-medium mb-4 mt-10">{`Today's Exams`}</h2>
          <div className="flex flex-col items-center justify-center min-h-96">
            <p className="text-lg font-medium mb-4">No exams today ☹️</p>
            <Link to="/exams">
              <button className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 mt-4">
                View all exams
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
