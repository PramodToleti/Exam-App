import { useEffect, useCallback, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export function useCheckAuth() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const pathname = useLocation().pathname

  const checkAuth = useCallback(async () => {
    try {
        setLoading(true)
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }

      const response = await fetch(
        "http://localhost:9001/api/student/auth/redirect",
        options
      )

        setLoading(false)

      if (pathname === "/student/login" || pathname === "/student/signup") {
        if (response.status === 200) {
          navigate("/dashboard")
        }
      }

      if (pathname === "/") {
        if (response.status === 200) {
          navigate("/dashboard")
        } else {
          navigate("/student/login")
        }
      }

      if (response.status !== 200 && pathname !== "/student/signup") {
        navigate("/student/login")
      } 
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }, [navigate, pathname])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return loading
}
