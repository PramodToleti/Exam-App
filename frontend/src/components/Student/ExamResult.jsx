import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading"

const ExamResult = () => {
  const { studentId, examId } = useParams()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState({})

  useEffect(() => {
    const getResult = async () => {
      setLoading(true)
      const res = await fetch(
        `http://localhost:9003/api/results/${studentId}/${examId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await res.json()
      setResult(data)
      setLoading(false)
    }
    getResult()
  }, [studentId, examId])

  console.log(result)

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <p className="dark:text-white">Marks: {result.marks && result.marks}</p>
    </div>
  )
}

export default ExamResult
