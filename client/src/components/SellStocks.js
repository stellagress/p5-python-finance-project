import React, { useEffect, useState } from "react";

function SellStocks({ user }) {
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [sharesToSell, setSharesToSell] = useState({});

  useEffect(() => {
    const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

    if (Array.isArray(portfolioStocksData)) {
      setPortfolioStocks(portfolioStocksData);
    }
  }, [user]);

  const calculateRemainingShares = (stockId) => {
    const enteredQuantity = parseInt(sharesToSell[stockId] || 0, 10);
    const stock = portfolioStocks.find((stock) => stock.stock.id === stockId);
    const currentQuantity = stock.shares_quantity;

    return currentQuantity - enteredQuantity;
  };

  const handleSellButton = (stockId) => {
    console.log("Selling...");
    // You can perform the selling logic here
  };

  const handleInputChange = (event, stockId) => {
    const { value } = event.target;

    // Update the shares to sell
    setSharesToSell({
      ...sharesToSell,
      [stockId]: value,
    });
  };

  return (
    <div>
      <h4>Sell Stocks Page:</h4>

      <ul>
        {portfolioStocks.map((portfolioStock, index) => (
          <li key={index}>
            <div>
              <p>Company: {portfolioStock.stock.name}</p>
              <p>Current Dividend Yield: {portfolioStock.stock.current_dividend_yield}</p>
              <p>Market Percentage Variation: {portfolioStock.stock.market_percentage_variation}</p>
            </div>
            <div>
              <p>Shares Quantity: {portfolioStock.shares_quantity}</p>
              <p>Price per Share: {portfolioStock.price_per_share}</p>
              <input
                type="number"
                placeholder="Enter quantity to sell"
                onChange={(event) => handleInputChange(event, portfolioStock.stock.id)}
              />
              <p>Total to receive: {portfolioStock.price_per_share * (sharesToSell[portfolioStock.stock.id] || 0)}</p>
              <p>Remaining Shares After Transaction: {calculateRemainingShares(portfolioStock.stock.id)}</p>
              <button onClick={() => handleSellButton(portfolioStock.stock.id)}>Sell</button>
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
//console.log(portfolioStock.stock.id)
//  console.log(user.portfolios[0].portfolio_stocks)



// import React, { useEffect, useState } from "react";

// function SellStocks({ user }) {
//   const [portfolioStocks, setPortfolioStocks] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState({});

//   useEffect(() => {
//     const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

//     if (portfolioStocksData) {
//       setPortfolioStocks(portfolioStocksData);
//     }
//   }, [user]);

//   const handleSellButton = () => {
//     console.log("Selling...")
//   }

//   const handleInputChange = (event, stockId) => {
//     const { value } = event.target;
//     setSelectedStocks({
//       ...selectedStocks,
//       [stockId]: value
//     });
//   }

//   const handleCheckBox = (event, stockId) => {
//     const isChecked = event.target.checked;

//     if (isChecked) {
//       setSelectedStocks({
//         ...selectedStocks,
//         [stockId]: selectedStocks[stockId] || 0
//       });
//     } else {
//       const { [stockId]: _, ...rest } = selectedStocks;
//       setSelectedStocks(rest);
//     }
//   }

//   const calculateTotalToReceive = (stockId) => {
//     const stock = portfolioStocks.find(stock => stock.stock.id === stockId);
//     const enteredQuantity = parseInt(selectedStocks[stockId] || 0, 10);
//     const pricePerShare = parseFloat(stock.price_per_share);

//     return enteredQuantity * pricePerShare;
//   }

//   return (
//     <div>
//       <h4>Sell Stocks Page:</h4>

//       <ul>
//         {portfolioStocks.map((portfolioStock, index) => (
//           <li key={index}>
//             <input
//               type="checkbox"
//               onChange={(event) => handleCheckBox(event, portfolioStock.stock.id)}
//             />
//             <div>
//               <p>Company: {portfolioStock.stock.name}</p>
//               <p>Current Dividend Yield: {portfolioStock.stock.current_dividend_yield}</p>
//               <p>Market Percentage Variation: {portfolioStock.stock.market_percentage_variation}</p>
//             </div>
//             <div>
//               <p>Shares Quantity: {portfolioStock.shares_quantity}</p>
//               <p>Price per Share: ${portfolioStock.price_per_share}</p>
//               <input
//                 type="number"
//                 placeholder="Enter quantity"
//                 onChange={(event) => handleInputChange(event, portfolioStock.stock.id)}
//               />
//               <p>Total to receive: {calculateTotalToReceive(portfolioStock.stock.id)}</p>
//               <button onClick={handleSellButton}>Sell</button>
//               <p>------------------------------------</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default SellStocks;















// const handleCheckBox = (stockId) => {
//   console.log(`Stock ID: ${stockId} checked/unchecked`);
// }

// // ...

// {portfolioStocks.map((portfolioStock, index) => (
//   <li key={index}>
//     <input
//       type="checkbox"
//       onChange={() => handleCheckBox(portfolioStock.stock.id)}
//     />
//     {/* ... rest of your code */}
//   </li>
// ))}
 