
function LoanDetails({loan}){

    return(

        <div className="loan-details">
            <h3>{loan.name}</h3>
            <p>{loan.owed}</p>
        </div>
    )
}

export default LoanDetails