// import React from "react";
// import { NavLink } from "react-router-dom";


// function NavBar(){

//     return (
//         <div>
//             <NavLink
//             to="/"
//             exact
//             >
//                 Main
//             </NavLink>
//         </div>

//     )
// }


// export default NavBar



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "../index.css";


function NavBar() {

    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Build out handle logout function!")
      };
    
    const toggleMenu = () => setMenu((prev) => !prev);
  



return (
    <div>
        {/* <Link to="/">Home</Link> */}
        <section className="nav-menu">
        {menu ? (
          <ul>
            <li className="close-button" onClick={() => setMenu(!menu)}>
              X
            </li>
            {/* <li>
              <Link to="/productions/new">New Production</Link>
            </li> */}
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li>
              <Link to="/authentication"> Login/Signup</Link>
            </li>
            <li className="logout-button" onClick={handleLogout}>
              {" "}
              Logout{" "}
            </li>
          </ul>
        ) : (
          <div className="hamburger-menu-wrapper" onClick={toggleMenu}>
            <GiHamburgerMenu size={30} />
          </div>
        )}
      </section>
 
        
        

    </div>
  );
}

export default NavBar;
