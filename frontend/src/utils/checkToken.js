export const checkToken = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }

  try {
    const response = await fetch(
      "https://exam-app-rnlu.onrender.com/api/student/auth/redirect",
      options
    )

    if (response.ok) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error("Error checking token:", error)
    return false
  }
}
