// Account.js
import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import Portfolio from "./Portfolio";
import AccountNav from "./AccountNav";
import BuyStocks from "./BuyStocks";


function Account({ updatePort, user }) {
    const [showStocks, setShowStocks] = useState(false);
    const [portfolioData, setPortfolioData] = useState(null);
    const navigate = useNavigate();

    return (
        <div>
          <AccountNav user = {user}/>
    
          <Routes>
            <Route path="/account/portfolio" element={<Portfolio />} user ={user}/>
    
    
    
            <Route
              path={"/account/buy_stocks"}
              element={<BuyStocks/>} user ={user}/>
    
            {/* <Route
              path="/account/transactions"
              element={
                <Transactions/>
              }
            /> 
     */}

          </Routes>
        </div>
      );
    }





export default Account;


  



//   return (
//     <div>
//       {user ? (
//         <div>
//           <p>Welcome, {user.first_name}</p>
//           <button onClick={() => { setShowStocks(!showStocks);}}>
//             Show My Stocks
//           </button>
//           {showStocks && <Portfolio />}
//         </div>
//       ) : (
//         <p>Welcome, Guest</p>
//       )}
//     </div>
//   );
// }

// export default Account;






// import React from "react";
// import { Link } from "react-router-dom";

// function Account({ user }) {
//   return (
//     <div>
//       {user ? (
//         <div>
//           <p>Welcome, {user.first_name}</p>
//           <ul>
//             <li>
//               <Link to="/account/Stocks">My Stocks</Link>
//             </li>
//             <li>
//               <Link to="/account/BuySell">Buy/Sell Stocks</Link>
//             </li>
//             <li>
//               <Link to="/account/Transactions">Transactions</Link>
//             </li>
//           </ul>
//         </div>
//       ) : (
//         <p>Welcome, Guest</p>
//       )}
//     </div>
//   );
// }

// export default Account;





// {user && (
//     <li>
//       <Link to="/account/Home"> Home</Link>
//     </li>
//   )}
//   {user && (
//     <li>
//       <Link to="/account/Stocks"> Stocks</Link>
//     </li>
//   )}
//   {user && (
//     <li>
//       <Link to="/account/BuySell"> Buy/Sell</Link>
//     </li>
//   )}
//   {user && (
//     <li>
//       <Link to="/account/Transactions"> Transactions</Link>
//     </li>
//   )}







