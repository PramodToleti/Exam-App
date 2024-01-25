import { useState } from "react"
import Navbar from "./Navbar"

const Exams = () => {
  const [examsCnt, setexamsCnt] = useState(Array.from({ length: 4 }))
  console.log(setexamsCnt)

  return (
    <section className="bg-slate-100 dark:bg-gray-900 py-4 md:py-10 min-h-screen">
      <div className="container mx-auto px-4">
        <Navbar />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 md:mt-10">
          {examsCnt.map((exam, index) => (
            <div
              className="max-w-sm min-h-56 p-6 flex flex-col  items-start justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-3"
              key={index}
            >
              <div>
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Exam Title
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the description for the project
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Duration: <span className="font-bold">20 min</span>
                </p>
              </div>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Start
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Exams
