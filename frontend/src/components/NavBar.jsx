import { NavLink } from "react-router-dom"

// TODO: use style class
let activeStyle = {
    color: "red"
}

const NavBar = () => {
    return (<>
        <nav>
            <NavLink style={({ isActive }) => 
                isActive ? activeStyle : undefined
            } to="/map">Map</NavLink> |{" "}
            <NavLink style={({ isActive }) => 
                isActive ? activeStyle : undefined
            } to="/charts">Charts</NavLink>
        </nav>
    </>);
}
 
export default NavBar;