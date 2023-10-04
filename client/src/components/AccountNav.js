import React, { useState } from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";
import Portfolio from "./Portfolio";

function AccountNav({ user }) {
  const [showPortfolio, setShowPortfolio] = useState(false);

  const togglePortfolio = () => {
    setShowPortfolio(!showPortfolio);
  };

  return (
    <div>
      <section className="nav-acct-menu">
        <h4>Welcome, {user.first_name}</h4>
        <p>Please, select desired option:</p>

        <ul>
          <li>
            <Link to="/account/portfolio" onClick={togglePortfolio}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/account/buy_sell_stocks"> Buy/Sell Stocks</Link>
          </li>
          <li>
            <Link to="/account/transactions"> Transactions</Link>
          </li>
        </ul>
      </section>
      
      {showPortfolio && <Portfolio user={user} />}
    </div>
  );
}

export default AccountNav;
