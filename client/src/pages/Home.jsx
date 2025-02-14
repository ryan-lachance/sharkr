import { useEffect, useState } from "react"

//component


function Home(){
    const api = import.meta.env.VITE_API_PATH
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let userSession = {isAuthenticated: false}

    useEffect(() => {
        fetch(`${api}/auth/status`, {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            userSession = data
            console.log(userSession)
            setIsLoggedIn(userSession.isAuthenticated)
        })
        .catch(error => console.error("Error:", error));
    }, []);

   
    function login(){
        window.location.href = `${api}/auth`
    }
    
    function logout(){
        window.location.href = `${api}/auth/logout`
    }

    

    return(
        <div>
            <div>{isLoggedIn ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}</div>
            <h1>{isLoggedIn ? "Logged In" : "Not Logged In"}</h1>
        </div>
    )
}

export default Home