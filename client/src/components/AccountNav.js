import { useState } from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";



function AccountNav() {


  return (
    <div>
        <section className="nav-acct-menu">
        
          <ul>
            <li>
              <Link to="/account/portfolio"> Portfolio</Link>
            </li>
            <li>
              <Link to="/account/buy_sell_stocks"> Buy/Sell Stocks</Link>
            </li>
            <li>
              <Link to="/account/transactions"> Transactions</Link>
            </li>
          </ul>
        
      </section>
    </div>
  );
}

export default AccountNav;