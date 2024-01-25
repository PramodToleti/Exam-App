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

        
      </div>
    </section>
  )
}

export default Dashboard
