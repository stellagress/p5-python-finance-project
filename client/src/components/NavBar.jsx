import { useState } from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "../index.css";


function NavBar({user}) {

    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logout!")
        // const history = useHistory();
        // useEffect(() => {
        //   fetch("/logout", { method: "DELETE" }).then((r) => r.json());
        //   history.push("/");
        // }, []);
      
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




// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// import "../index.css";

// function NavBar({ user }) {
//   const [menu, setMenu] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     console.log("Build out handle logout function!");
//   };

//   const toggleMenu = () => setMenu((prev) => !prev);

//   return (
//     <div>
//       <section className="nav-menu">
//         {menu ? (
//           <ul>
//             <li className="close-button" onClick={() => setMenu(!menu)}>
//               X
//             </li>

//             {/* Check if user is authenticated */}
//             {user ? (
//               <li>
//                 <Link to="/account/Home"> Home</Link>
//               </li>
//             ) : (
//               <li>
//                 <Link to="/"> Home</Link>
//               </li>
//             )}

//             <li>
//               <Link to="/authentication"> Login/Signup</Link>
//             </li>
//             <li className="logout-button" onClick={handleLogout}>
//               {" "}
//               Logout{" "}
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

