import { Link } from "react-router-dom";

const NavBar = ()=>{
    return(
        <>
             <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/add-book" className="text-white hover:underline">Add Book</Link>
                </li>
                <li>
                    <Link to="/books" className="text-white hover:underline">Book List</Link>
                </li>
                <li>
                    <Link to="/login" className="text-white hover:underline">Login</Link>
                </li>
                <li>
                    <Link to="/register" className="text-white hover:underline">Register</Link>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default NavBar;