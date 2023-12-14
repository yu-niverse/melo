import { useParams, useNavigate } from "react-router-dom"

const Join = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const handleJoin = () => {
        navigate(`/room/${id}`)
    }

    return (
        <div>
            Join room id: {id}
            <button onClick={handleJoin}>Join</button>
        </div>
    )
}

export default Join
