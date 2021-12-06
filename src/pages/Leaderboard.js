import { useAuth } from '../features/auth'

const Leaderboard = () => {
    const auth = useAuth();
    console.log("LEADER", auth)
    return <div>Leaderboard</div>
}

export default Leaderboard