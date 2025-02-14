import { Link } from "react-router-dom"

function NavBar(){

    return (
        <header>
            <div className="container">
                <Link t0="/">
                    <p>Home</p>
                </Link>
            </div>
        </header>
    )
}

export default NavBar