import { NavLink } from "react-router-dom"

const NavBar = () => {
    return (
        <nav>
            <div><NavLink to="/map">Map</NavLink></div>
            <div><NavLink to="/charts">Charts</NavLink></div>
            <NavLink style={({ isActive }) => 
                isActive ? activeStyle : undefined
            } to="/">Home</NavLink> |{" "}
            <NavLink style={({ isActive }) => 
                isActive ? activeStyle : undefined
            } to="/map">Map</NavLink> |{" "}
            <NavLink style={({ isActive }) => 
                isActive ? activeStyle : undefined
            } to="/charts">Charts</NavLink>
        </nav>
    );
}
 
export default NavBar;