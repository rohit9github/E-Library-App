import { Link } from "react-router-dom";

const NavBar = ()=>{
    return(
        <>
            <ul>
                <li>
                    <Link to={"/add-book"}>AddBook</Link>
                </li>
                <li>
                    <Link to={"/books"}>BookList</Link>
                </li>
                <li>
                    <Link to={"/edit-book/:id"}>bookEdit</Link>
                </li>
                <li>
                    <Link to={"/login"}>login</Link>
                </li>
                <li>
                    <Link to={"/register"}>register</Link>
                </li>
            </ul>
        </>
    )
}

export default NavBar;