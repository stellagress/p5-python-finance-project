import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cssInfo/AccountNav.css";

function AccountNav({ user, updateUser }) {
  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5555/current_user', {
  //         method: 'GET',
  //         credentials: 'include',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //         }
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         if (!data.errors) {
  //           updateUser(data);
  //         }
  //       } else {
  //         console.error('Failed to fetch current user');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchCurrentUser();
  // }, [updateUser]);

  return (
    <div className="account-nav-container">
      <section className="nav-acct-menu">
        <h4 className="welcome-text">Welcome, {user?.first_name}</h4>
        <p className="select-option-text">Please select a desired option:</p>

        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/account/portfolio" className="nav-link">
              Portfolio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/account/buy_stocks" className="nav-link">
              Buy Stocks
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/account/sell_stocks" className="nav-link">
              Sell Stocks
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AccountNav;










// import React from "react";
// import { Link } from "react-router-dom";
// import "./cssInfo/AccountNav.css";



// function AccountNav({ user }) {
//   return (
//     <div className="account-nav-container">
//       <section className="nav-acct-menu">
//         <h4 className="welcome-text">Welcome, {user?.first_name}</h4>
//         <p className="select-option-text">Please select a desired option:</p>

//         <ul className="nav-list">
//           <li className="nav-item">
//             <Link to="/account/portfolio" className="nav-link">
//               Portfolio
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/account/buy_stocks" className="nav-link">
//               Buy Stocks
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/account/sell_stocks" className="nav-link">
//               Sell Stocks
//             </Link>
//           </li>
//         </ul>
//       </section>
//     </div>
//   );
// }

// export default AccountNav;
