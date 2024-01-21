import { useCheckAuth } from "../../utils/auth"
import Loading from "./Loading"

const Exams = () => {
  const checkToken = useCheckAuth()
  return !checkToken ? (
    <div>
      <h1>Exams</h1>
    </div>
  ) : (
    <Loading />
  )
}

export default Exams
