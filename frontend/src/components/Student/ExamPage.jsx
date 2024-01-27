import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import Loading from "./Loading"

const options = ["a", "b", "c", "d"]

const ExamPage = () => {
  const { id } = useParams()
  const [exam, setExam] = useState({})
  const [isExamFetched, setIsExamFetched] = useState(false)
  const [timer, setTimer] = useState(600)
  const [index, setIndex] = useState(1)
  const history = useHistory()
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(false)

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
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:9002/api/exams/${id}`)
        const result = await response.json()
        setLoading(false)
        if (response.ok) {
          setExam(result[0])
          setTimer(result[0].duration * 60)
          setIsExamFetched(true)
          setAnswers([
            ...result[0].questions.map((question) => ({
              question: question.question,
              answer: "",
            })),
          ])
        }
      } catch (error) {
        console.error("Error fetching exam:", error)
      }
    }

    if (!isExamFetched) {
      fetchExam()
    }
  }, [id, isExamFetched, exam.questions])

  /*  useEffect(() => {
    if (isExamFetched) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)

      return () => clearInterval(countdown)
    }
  }, [isExamFetched]) */

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`
  }

  const handleNextClick = () => {
    if (index < exam?.questions.length) {
      setIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handlePrevClick = () => {
    if (index > 1) {
      setIndex((prevIndex) => prevIndex - 1)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      studentId: JSON.parse(localStorage.getItem("user")).id,
      examId: exam._id,
      questions: answers,
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    }

    const response = await fetch(
      "http://localhost:9002/api/exams/submit",
      options
    )
    const result = await response.json()
    console.log(result)
    /*   const userConfirmsSubmit = confirm("Are you sure you want to submit?")
    if (userConfirmsSubmit) {
      history.replace("/results", { answers: answers, exam: exam })
    } */
  }

  return loading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loading />
    </div>
  ) : (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-4 md:py-10 min-h-screen">
      {exam?._id ? (
        <form className="container mx-auto p-3" onSubmit={onSubmit}>
          <div className="md:hidden flex justify-between items-center mb-4">
            <button
              onClick={() => onClick("/exams")}
              className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
            >
              Exit
            </button>
            <button
              type="submit"
              /*  onClick={() => onClick("/results")} */
              className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Submit
            </button>
          </div>
          <header className="bg-gray-500 dark:bg-gray-800 text-white p-4 md:grid grid-cols-3 items-center rounded-md">
            <div className="hidden md:block">
              <h1 className="text-xl font-bold mb-1">{exam.title}</h1>
              <p className="text-sm">{exam.topic}</p>
            </div>
            <div className="text-center">
              <p className="text-sm">Time Remaining</p>
              <p className="text-xl font-bold">{formatTime(timer)}</p>
            </div>

            <div className="hidden md:flex gap-4 justify-end">
              <button
                onClick={() => onClick("/exams")}
                className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Exit
              </button>
              <button
                type="submit"
                /* onClick={() => onClick("/results")} */
                className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </header>
          <main className="my-5">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
              <div className="md:w-5/6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 min-h-80 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Question {index}</h1>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg">
                      {exam?.questions && exam.questions[index - 1]?.question}
                    </p>
                  </div>
                  <div className="mt-5">
                    <div className="flex flex-col gap-4">
                      {exam?.questions &&
                        exam.questions[index - 1]?.options.map((option, i) => (
                          <label
                            key={i}
                            className="inline-flex items-center mb-2"
                          >
                            <input
                              type="radio"
                              className="form-radio"
                              name={`question-${index}-option-${options[i]}`}
                              value={options[i]}
                              checked={
                                answers[index - 1]?.answer === options[i]
                                  ? true
                                  : false
                              }
                              onChange={() => {
                                setAnswers((prevAnswers) => {
                                  const newAnswers = [...prevAnswers]
                                  newAnswers[index - 1] = {
                                    question:
                                      exam.questions[index - 1]?.question,
                                    answer: options[i],
                                  }
                                  return newAnswers
                                })
                              }}
                            />
                            <span className="ml-2">{option}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4 hidden md:block">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-h-96 overflow-y-scroll">
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Questions</h1>
                    <p className="text-sm">
                      {exam.questions && exam.questions.length}
                    </p>
                  </div>
                  <div className="mt-4">
                    <ul className="flex flex-col gap-4">
                      {exam.questions &&
                        exam.questions.map((question, index) => (
                          <li
                            className="flex justify-between items-center"
                            key={index}
                          >
                            <p>{index + 1}</p>
                            <p>
                              {answers[index] !== undefined
                                ? answers.filter(
                                    (answer) =>
                                      answer.question === question.question
                                  )[0]?.answer !== undefined && "Answered"
                                : "Unanswered"}
                            </p>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex  gap-4 md:hidden">
                {index > 1 && (
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={handlePrevClick}
                  >
                    Previous
                  </button>
                )}
                {exam.questions && index < exam?.questions.length && (
                  <button
                    type="button"
                    className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={handleNextClick}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
            <div className="hidden mt-6 md:flex justify-center gap-4">
              {index > 1 && (
                <button
                  type="button"
                  className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={handlePrevClick}
                >
                  Previous
                </button>
              )}
              {exam.questions && index < exam?.questions.length && (
                <button
                  type="button"
                  className="flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              )}
            </div>
          </main>
        </form>
      ) : (
        <div className="flex justify-center items-center h-screen text-4xl font-medium">
          No Exam Found
        </div>
      )}
    </div>
  )
}

export default ExamPage
