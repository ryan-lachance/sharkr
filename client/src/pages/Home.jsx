import { useEffect, useState } from "react"

//component
import LoanDetails from '../components/LoanDetails'

function Home(){
    
    const [loans, setLoans] = useState(null)

    useEffect(() => {
        const fetchLoans = async () =>{
            console.log('test0')
            const response = await fetch('http://localhost:2000/api/loans') //Add path to env
            const json = await response.json()
            console.log('test1')
            
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