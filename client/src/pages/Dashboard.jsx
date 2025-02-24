import { useEffect, useState } from "react"
import {Container, Box, Typography} from '@mui/material'




//component
import SplitView from "../components/SplitView";

function Dashboard(){
    const api = import.meta.env.VITE_API_PATH
    const [userSession, setUserSession] = useState({isAuthenticated: false});
    const [guilds, setGuilds] = useState([])
    
    function authUser(){
        fetch(`${api}/auth/status`, {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            
            setUserSession(data)
            console.log(data)
        })
        .catch(error => console.error("Error:", error));
    }

    function getGuilds(){
        fetch(`${api}/guilds`, {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            
            setGuilds(data)
            console.log(data)
        })
        .catch(error => console.error("Error:", error));
    }



    useEffect(() => {
        authUser()
        getGuilds()

    }, []);



    return(
        <Container>
            <Typography>This is the dashboard</Typography>
            <SplitView/>
        </Container>
    )
}

export default Dashboard