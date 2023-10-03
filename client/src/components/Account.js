import React from "react";
import { Link } from "react-router-dom";

function Account({ user }) {
  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.first_name}</p>
          <ul>
            <li>
              <Link to="/account/Stocks">My Stocks</Link>
            </li>
            <li>
              <Link to="/account/BuySell">Buy/Sell Stocks</Link>
            </li>
            <li>
              <Link to="/account/Transactions">Transactions</Link>
            </li>
          </ul>
        </div>
      ) : (
        <p>Welcome, Guest</p>
      )}
    </div>
  );
}

export default Account;





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







