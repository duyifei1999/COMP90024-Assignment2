import { NavLink } from "react-router-dom"

const NavBar = () => {
    return (
        <nav>
            <div><NavLink to="/map">Map</NavLink></div>
            <div><NavLink to="/charts">Charts</NavLink></div>
        </nav>
    );
}
 
export default NavBar;