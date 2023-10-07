import React from "react";
import { Link } from "react-router-dom";


function AccountNav({ user }) {

  return (
    <div>
      <section className="nav-acct-menu">
        <h4>Welcome, {user?.first_name}</h4>
        <p>Please, select desired option:</p>

        <ul>
          <li>
            <Link to="/account/portfolio">
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/account/buy_stocks">
               Buy Stocks</Link>
          </li>
          <li>
            <Link to="/account/sell_stocks">
               Sell Stocks</Link>
          </li>
        </ul>
      </section>

    </div>
  );
}

export default AccountNav;









// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useHistory, useParams } from "react-router-dom";
// import Portfolio from "./Portfolio";
// import BuyStocks from "./BuyStocks";
// import SellStocks from "./SellStocks";

// function AccountNav({ user }) {
//   const [showPortfolio, setShowPortfolio] = useState(false);
  

//   const togglePortfolio = () => {
//     setShowPortfolio(!showPortfolio);
//   };



//   return (
//     <div>
//       <section className="nav-acct-menu">
//         <h4>Welcome, {user?.first_name}</h4>
//         <p>Please, select desired option:</p>

//         <ul>
//           <li>
//             <Link to="/account/portfolio" onClick={togglePortfolio}>
//               Portfolio
//             </Link>
//           </li>
//           <li>
//             <Link to="/account/buy_stocks">
//                Buy Stocks</Link>
//           </li>
//           <li>
//             <Link to="/account/sell_stocks">
//                Sell Stocks</Link>
//           </li>
//         </ul>
//       </section>
      
//       {showPortfolio && <Portfolio user={user} />}

//     </div>
//   );
// }

// export default AccountNav;
