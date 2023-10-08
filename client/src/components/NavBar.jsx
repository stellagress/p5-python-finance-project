import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "../index.css";


function NavBar({user}) {

    const [menu, setMenu] = useState(false);
   

    const handleLogout = () => {

          fetch("http://localhost:5555/logout", { method: "DELETE" }).then((r) => r.json());
          
      };
    
    const toggleMenu = () => setMenu((prev) => !prev);
  



return (
    <div>
        <section className="nav-menu">
        {menu ? (
          <ul>
            <li className="close-button" onClick={() => setMenu(!menu)}>
              X
            </li>
   
            <li>
              <Link to="/"> Home</Link>
            </li>
            <li>
              <Link to="/authentication"> Login/Signup</Link>
            </li>
            <li className="logout-button" onClick={handleLogout}>
              <Link to="/logout"> Logout</Link>
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











// backup
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// import "../index.css";


// function NavBar({user}) {

//     const [menu, setMenu] = useState(false);
   

//     const handleLogout = () => {

//           fetch("http://localhost:5555/logout", { method: "DELETE" }).then((r) => r.json());
          
//       };
    
//     const toggleMenu = () => setMenu((prev) => !prev);
  



// return (
//     <div>
//         <section className="nav-menu">
//         {menu ? (
//           <ul>
//             <li className="close-button" onClick={() => setMenu(!menu)}>
//               X
//             </li>
   
//             <li>
//               <Link to="/"> Home</Link>
//             </li>
//             <li>
//               <Link to="/authentication"> Login/Signup</Link>
//             </li>
//             <li className="logout-button" onClick={handleLogout}>
//               <Link to="/logout"> Logout</Link>
//             </li>
//           </ul>
//         ) : (
//           <div className="hamburger-menu-wrapper" onClick={toggleMenu}>
//             <GiHamburgerMenu size={30} />
//           </div>
//         )}
//       </section>

//     </div>
//   );
// }

// export default NavBar;
