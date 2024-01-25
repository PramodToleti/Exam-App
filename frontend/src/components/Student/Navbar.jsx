import { useState } from "react"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import { PiExam } from "react-icons/pi"
import { LiaLandmarkSolid } from "react-icons/lia"
import { FaChalkboard } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import toast from "react-hot-toast"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const Navbar = () => {
  const [nav, setNav] = useState(false)

  const menuItems = [
    {
      icon: <FaChalkboard size={30} />,
      text: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <CgProfile size={30} />,
      text: "Profile",
      link: "/profile",
    },
    {
      icon: <PiExam size={30} />,
      text: "Exams",
      link: "/exams",
    },
    {
      icon: <LiaLandmarkSolid size={30} />,
      text: "Results",
      link: "/results",
    },
  ]

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
        localStorage.removeItem("user")
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
    <div className="mx-auto flex justify-between items-center text-gray-800 dark:text-slate-100">
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-2xl px-2 dark:text-gray-800">SITE</h1>
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
      </div>

      <div
        className={
          nav
            ? "fixed top-0 right-0 w-[280px] h-screen bg-white text-gray-800 z-10 duration-300"
            : "fixed top-0 right-[-100%] w-[280px] h-screen bg-white text-gray-800  z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute text-gray-800 right-4 top-4 cursor-pointer"
        />
        <nav className="flex flex-col justify-between h-[90%] mx-4 my-4">
          <ul className="flex flex-col p-4 gap-5 mt-10 text-gray-800">
            {menuItems.map(({ icon, text, link }, index) => {
              return (
                <Link
                  key={index}
                  to={link}
                  className="text-xl flex gap-2 cursor-pointer  w-[50%] rounded-full mx-auto p-2 py-4"
                >
                  <li>{icon}</li>
                  <p className="text-center">{text}</p>
                </Link>
              )
            })}
          </ul>
          <div
            className="flex justify-center items-center"
            onClick={handleLogout}
          >
            <FiLogOut size={30} className="cursor-pointer" />
            <p className="text-xl cursor-pointer">Logout</p>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
