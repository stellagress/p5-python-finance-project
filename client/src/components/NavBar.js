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



import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
        <Link to="/">Home</Link>

    </div>
  );
}

export default NavBar;
