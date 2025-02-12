import { useEffect, useState } from "react"

//component
import LoanDetails from '../components/LoanDetails'

function Home(){
    const api = import.meta.env.VITE_API_PATH
    
    const [loans, setLoans] = useState(null)

    useEffect(() => {
        const fetchLoans = async () =>{
            const response = await fetch(`${api}/loans`) //Add path to env
            const json = await response.json()

            
            if (response.ok){
                setLoans(json)
            }

        }

        fetchLoans()

    }, [])

    return(
        <div className="home">
            <div className="loans">
                {loans && loans.map((loan) => (
                    <LoanDetails key={loan._id} loan={loan}/>
                ))}
            </div>
        </div>
    )
}

export default Home