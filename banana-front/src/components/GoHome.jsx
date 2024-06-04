import { useNavigate } from "react-router-dom"
import { Button } from "./StyledComponents"


const GoHomeButton = (props) => {
    const navigate = useNavigate()
  return (
    <Button {...props} onClick={()=>navigate("/")}>
        Go Home
    </Button>
  )
}

export default GoHomeButton