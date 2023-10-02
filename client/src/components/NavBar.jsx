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


function NavBar() {

    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
  



return (
    <div>
        {/* <Link to="/">Home</Link> */}
 
        
        

    </div>
  );
}

export default NavBar;
