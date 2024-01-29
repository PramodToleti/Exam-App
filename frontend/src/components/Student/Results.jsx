import { useEffect, useState } from "react"
import Navbar from "./Navbar"

const Results = () => {
  const [results, setResults] = useState([])
  const studentId = JSON.parse(localStorage.getItem("user")).id

  useEffect(() => {
    const getResult = async () => {
      const res = await fetch(
        `http://localhost:9003/api/results/${studentId}/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )
      const data = await res.json()
      setResults(data.results)
    }
    getResult()
  }, [studentId])

  return (
    <section className="bg-slate-100 dark:bg-gray-900 py-4 md:py-10 min-h-screen">
      <div className="container mx-auto px-4">
        <Navbar />
        {!results ? (
          <div className="bg-gray-100 dark:bg-slate-900 min-h-screen container flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              No Results
            </h1>
          </div>
        ) : (
          results && (
            <div className="">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Results
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.slice().reverse().map((result, index) => (
                  <div
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-4 max-w-lg w-full flex flex-col items-center"
                    key={index}
                  >
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                      {result.title}
                    </h1>
                    <p className=" text-gray-800 dark:text-gray-100 mb-4">
                      {result.topic}
                    </p>
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="flex flex-col">
                        <h2 className="text-4xl font-bold self-center text-gray-800 dark:text-gray-100 mb-4 h-12 text-center  rounded-full">
                          {result.noOfCorrectAnswers} / {result.totalMarks}
                        </h2>
                        <div className="flex flex-col md:flex-row justify-between gap-6 mb-4">
                          <div className="flex flex-col gap-3 items-center">
                            <p className="text-gray-800 dark:text-gray-100 text-lg">
                              Correct answers
                            </p>
                            <p className="text-gray-800 dark:text-gray-100 font-medium text-lg md:text-xl">
                              {result.noOfCorrectAnswers}
                            </p>
                          </div>
                          <div className="flex flex-col gap-3 items-center">
                            <p className="text-gray-800 dark:text-gray-100 text-lg">
                              Wrong answers
                            </p>
                            <p className="text-gray-800 dark:text-gray-100 font-medium text-lg md:text-xl">
                              {result.noOfWrongAnswers}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-800 dark:text-gray-100 text-center mt-4">
                          Submitted at:{" "}
                          {new Date(result.submissionTime).toLocaleString(
                            undefined,
                            {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Results
