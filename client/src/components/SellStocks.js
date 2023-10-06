import React, { useEffect, useState } from "react";

function SellStocks({ user }) {
  const [companyInfo, setCompanyInfo] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);

  useEffect(() => {
    const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

    if (portfolioStocksData) {
      setPortfolioStocks(portfolioStocksData);
    }
  }, [user]);

  useEffect(() => {
    const companyData = user?.portfolios[0]?.portfolio_stocks[4]?.stock;
    if (companyData) {
      setCompanyInfo(companyData);
    }
  }, [user]);



  const handleSellButton = () => {
    console.log("Selling...")
  }

  const handleInputChange = (event) => {
    console.log("Value", event)
  }


  const handleCheckBox= () => {
    console.log("Box checked")
  }



  return (
    <div>
      <h4>Sell Stocks Page:</h4>

      <ul>
        {portfolioStocks.map((portfolioStock, index) => (
          <li key={index}>
            <input type="checkbox"
            onChange={handleCheckBox}
            />
            <div>
              <p>Company: {companyInfo.name}</p>
              <p>Current Dividend Yield: {companyInfo.current_dividend_yield}</p>
              <p>Market Percentage Variation: {companyInfo.market_percentage_variation}</p>
            </div>
            <div>
              <p>Shares Quantity: {portfolioStock.shares_quantity}</p>
              <p>Price per Share: {portfolioStock.price_per_share}</p>
              
              <input
                  type="text"
                  placeholder="Enter quantity"
                  onChange={(event) => handleInputChange(event, index)}
                />
              <p>Total to receive: </p>
              <button onClick={handleSellButton}>Sell</button>

              <p>------------------------------------</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SellStocks;






 // console.log(user.portfolios[0].portfolio_stocks[4].stock)



//  import React, { useEffect, useState } from "react";

//  function SellStocks({ user }) {
//    const [companyInfo, setCompanyInfo] = useState([]);
//    const [portfolioStocks, setPortfolioStocks] = useState([]);
 
//    useEffect(() => {
//      const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;
 
//      if (portfolioStocksData) {
//        setPortfolioStocks(portfolioStocksData);
//      }
//    }, [user]);
 
//    useEffect(() => {
//      const companyData = user?.portfolios[0]?.portfolio_stocks[4]?.stock;
//      if (companyData) {
//        setCompanyInfo(companyData);
//      }
//    }, [user]);
 
//    return (
//      <div>
//        <h4>Sell Stocks Page:</h4>
 
//        <ul>
//          {portfolioStocks.map((portfolioStock, index) => (
//            <li key={index}>
//              <div>
//                <p>Company: {companyInfo.name}</p>
//                <p>Current Dividend Yield: {companyInfo.current_dividend_yield}</p>
//                <p>Market Percentage Variation: {companyInfo.market_percentage_variation}</p>
//              </div>
//              <div>
//                <p>Shares Quantity: {portfolioStock.shares_quantity}</p>
//                <p>Price per Share: {portfolioStock.price_per_share}</p>
//                <p>------------------------------------</p>
//              </div>
//            </li>
//          ))}
//        </ul>
//      </div>
//    );
//  }
 
//  export default SellStocks;
 