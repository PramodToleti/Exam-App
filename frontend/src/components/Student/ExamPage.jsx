import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

const ExamPage = () => {
  const { id } = useParams()
  const [timer, setTimer] = useState(300)

  const history = useHistory()

  function confirmSwitchTab() {
    var result = confirm("Are you sure you want to exit?")
    if (result) {
      return true
    } else {
      return false
    }
  }

  const onClick = (path) => {
    const userConfirmsSwith = confirmSwitchTab()
    if (userConfirmsSwith) history.replace(path)
  }

  useEffect(() => {
    const fetchExam = async () => {
      const response = await fetch(`http://localhost:9002/api/exams/${id}`)
      const result = await response.json()
      console.log(result)
    }

    fetchExam()
  }, [id])

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 1000)

    return () => clearInterval(countdown)
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-4 md:py-10 min-h-screen">
      <div className="container mx-auto">
        <header className="bg-gray-700 text-white p-4 flex justify-between items-center rounded-md">
          <div>
            <h1 className="text-xl font-bold">Exam Name</h1>
            <p className="text-sm">Subject Name</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => onClick("/exams")}
              className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Exit
            </button>
            <button
              onClick={() => onClick("/results")}
              className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </header>
        <main className="my-4">
          <div className="flex gap-4">
            <div className="w-3/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold">Question 1</h1>
                  <p className="text-sm">{formatTime(timer)}</p>
                </div>
                <div className="mt-4">
                  <p className="text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quibusdam, voluptas.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="answer"
                        id="answer1"
                        className="rounded-full"
                      />
                      <label htmlFor="answer1">Answer 1</label>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="answer"
                        id="answer2"
                        className="rounded-full"
                      />
                      <label htmlFor="answer2">Answer 2</label>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="answer"
                        id="answer3"
                        className="rounded-full"
                      />
                      <label htmlFor="answer3">Answer 3</label>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="answer"
                        id="answer4"
                        className="rounded-full"
                      />
                      <label htmlFor="answer4">Answer 4</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-bold">Questions</h1>
                  <p className="text-sm">10</p>
                </div>
                <div className="mt-4">
                  <ul className="flex flex-col gap-4">
                    <li className="flex justify-between items-center">
                      <p>1</p>
                      <p>Answered</p>
                    </li>
                    <li className="flex justify-between items-center">
                      <p>2</p>
                      <p>Answered</p>
                    </li>
                    <li className="flex justify-between items-center">
                      <p>3</p>
                      <p>Answered</p>
                    </li>
                    <li className="flex justify-between items-center">
                      <p>4</p>
                      <p>Answered</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ExamPage
