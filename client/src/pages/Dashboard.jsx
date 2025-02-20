import { useEffect, useState } from "react"
import {Container, Box, Typography} from '@mui/material'




//component
import SplitView from "../components/SplitView";

function Dashboard(){
    const api = import.meta.env.VITE_API_PATH
    const [userSession, setUserSession] = useState({isAuthenticated: false});
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        fetch(`${api}/auth/status`, {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            setUserSession(data)
            setLoading(false)
        })
        .catch(error => console.error("Error:", error));
    }, []);

    if (loading){
        return <Typography>Loading...</Typography>;
    }

    return(
        <Container>
            <Typography>This is the dashboard</Typography>
            <SplitView/>
        </Container>
    )
}

export default Dashboard