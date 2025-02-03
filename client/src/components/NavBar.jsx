import { Link } from "react-router-dom"

function NavBar(){

    return (
        <header>
            <div className="container">
                <Link t0="/">
                    <h1>Home</h1>
                </Link>
            </div>
        </header>
    )
}

export default NavBar