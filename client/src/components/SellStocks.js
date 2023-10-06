import React, { useEffect, useState } from "react";

function SellStocks({ user }) {
  const [portfolioStocks, setPortfolioStocks] = useState([]);


  useEffect(() => {
    const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

    if (portfolioStocksData) {
      setPortfolioStocks(portfolioStocksData);
    }
  }, [user]);


  const handleSellButton = () => {
    console.log("Selling...")
  }

  const handleInputChange = (event) => {
    console.log("Value", event)
  }


  const handleCheckBox = () => {
    console.log("checked/unchecked")
    user.portfolios[0].portfolio_stocks.forEach(function(stockItem) {
      console.log(stockItem.stock.id); 
    });
  }
  
  

  // console.log(user.portfolios[0].portfolio_stocks[4].stock.id)
  // console.log(user.portfolios[0].portfolio_stocks)



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
              <p>Company: {portfolioStock.stock.name}</p>
              <p>Current Dividend Yield: {portfolioStock.stock.current_dividend_yield}</p>
              <p>Market Percentage Variation: {portfolioStock.stock.market_percentage_variation}</p>
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

//  console.log(user.portfolios[0].portfolio_stocks)



// import React, { useEffect, useState } from "react";

// function SellStocks({ user }) {
//   const [portfolioStocks, setPortfolioStocks] = useState([]);

//   useEffect(() => {
//     const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

//     if (portfolioStocksData) {
//       setPortfolioStocks(portfolioStocksData);
//     }
//   }, [user]);

//   return (
//     <div>
//       <h4>Sell Stocks Page:</h4>

//       <ul>
//         {portfolioStocks.map((portfolioStock, index) => (
//           <li key={index}>
//             <div>
//               <p>Company: {portfolioStock.stock.name}</p>
//               <p>Current Dividend Yield: {portfolioStock.stock.current_dividend_yield}</p>
//               <p>Market Percentage Variation: {portfolioStock.stock.market_percentage_variation}</p>
//             </div>
//             <div>
//               <p>Shares Quantity: {portfolioStock.shares_quantity}</p>
//               <p>Price per Share: {portfolioStock.price_per_share}</p>
//               <p>------------------------------------</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default SellStocks;

 