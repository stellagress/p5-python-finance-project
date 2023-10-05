import React, { useState, useEffect } from "react";
import { Link, useNavigate, useHistory, useParams } from "react-router-dom";
import Portfolio from "./Portfolio";
import BuyStocks from "./BuyStocks";

function AccountNav({ user }) {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showSell, setSell] = useState(false);

  const togglePortfolio = () => {
    setShowPortfolio(!showPortfolio);
  };

  // const toggleSellStocks = () => {
  //   setSell(!showSell);
  // };


  // const handleSellStocks = () => {
  //   console.log("Selling stocks")
  // }

  return (
    <div>
      <section className="nav-acct-menu">
        <h4>Welcome, {user?.first_name}</h4>
        <p>Please, select desired option:</p>

        <ul>
          <li>
            <Link to="/account/portfolio" onClick={togglePortfolio}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/account/buy_stocks">
               Buy Stocks</Link>
          </li>
          <li>
            <Link to="/account/sell_stocks"> Sell Stocks</Link>
          </li>
        </ul>
      </section>
      
      {showPortfolio && <Portfolio user={user} />}
      {/* {showBuy && <BuyStocks user={user} />} */}
    </div>
  );
}

export default AccountNav;

















// import React, { useState } from "react";
// import { Link, useNavigate, useHistory } from "react-router-dom";
// import Portfolio from "./Portfolio";
// import BuyStocks from "./BuyStocks";

// function AccountNav({ user }) {
//   const [showPortfolio, setShowPortfolio] = useState(false);
//   const [showBuy, setBuy] = useState(false);

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
//             <Link to="/account/sell_stocks"> Sell Stocks</Link>
//           </li>
//         </ul>
//       </section>
      
//       {showPortfolio && <Portfolio user={user} />}
//       {/* {showBuy && <BuyStocks user={user} />} */}
//     </div>
//   );
// }

// export default AccountNav;

