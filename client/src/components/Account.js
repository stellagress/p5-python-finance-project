// Account.js
import React, { useState, useEffect } from "react";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import Portfolio from "./Portfolio";
import AccountNav from "./AccountNav";
import BuyStocks from "./BuyStocks";
import SellStocks from "./SellStocks";


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
    
            <Route
              path="/account/sell_stocks"
              element={<SellStocks/>}/> 
     

          </Routes>
        </div>
      );
    }





export default Account;


  



// // Account.js
// import React, { useState, useEffect } from "react";
// import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
// import Portfolio from "./Portfolio";
// import AccountNav from "./AccountNav";
// import BuyStocks from "./BuyStocks";
// import SellStocks from "./SellStocks";


// function Account({ updatePort, user }) {
//     const [showStocks, setShowStocks] = useState(false);
//     const [portfolioData, setPortfolioData] = useState(null);
//     const navigate = useNavigate();

//     return (
//         <div>
//           <AccountNav user = {user}/>
    
//           <Routes>
//             <Route path="/account/portfolio" element={<Portfolio />} user ={user}/>
    
    
    
//             <Route
//               path={"/account/buy_stocks"}
//               element={<BuyStocks/>} user ={user}/>
    
//             <Route
//               path="/account/sell_stocks"
//               element={<SellStocks/>}/> 
     

//           </Routes>
//         </div>
//       );
//     }





// export default Account;





