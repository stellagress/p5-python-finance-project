import React, { useEffect, useState } from "react";

function Portfolio({ user }) {
  const [portfolioStocks, setPortfolioStocks] = useState([]);

  useEffect(() => {
    const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

    if (Array.isArray(portfolioStocksData)) {
      setPortfolioStocks(portfolioStocksData);
    }
  }, [user]);

  return (
    <div>
      <h4>Portfolio Page:</h4>
      {portfolioStocks.length > 0 ? (
        
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
                <p>Price per Share: ${portfolioStock.price_per_share}</p>
                <p>------------------------------------</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h5>
          You currently do not have shares added. Please visit Buy Stocks to add shares to your portfolio.
        </h5>
      )}
    </div>
  );
}

export default Portfolio;






// import React, { useEffect, useState } from "react";


// function Portfolio({ user }) {
//   const [portfolioStocks, setPortfolioStocks] = useState([]);

//   useEffect(() => {
//     const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

//     if (Array.isArray(portfolioStocksData)) {
//       setPortfolioStocks(portfolioStocksData);
//     }
//   }, [user]);

//   return (
//     <div>
//       <h4>Portfolio Page:</h4>
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
//               <p>Price per Share: ${portfolioStock.price_per_share}</p>
//               <p>------------------------------------</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Portfolio;













// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function Portfolio({ user }) {
//   let nav = useNavigate()
//   const { portfolioId } = useParams();
//   const [stocks, setStocks] = useState([]);

//   useEffect(() => {
   
//     if (portfolioId) {
//       fetch(`http://localhost:5555/portfolio/${portfolioId}/stocks`)
//         .then((res) => res.json())
//         .then((data) => setStocks(data))
//         .catch((error) => console.error(error));
//     }
//   }, [portfolioId]);

//   let portfolioContent;

//   if (portfolioId) {
   
//     const stocksJsx = stocks.map((stock, index) => (
//       <div key={index}>
//         <p>{stock.name}</p>
//         <p>{stock.current_dividend_yield}</p>
//         <p>{stock.market_percentage_variation}</p>
//         <p>------------------------------------</p>
//       </div>
//     ));

//     portfolioContent = (
//       <div>
//         {stocksJsx}
//       </div>
//     );
//   } else {
    
//     const handleClick = (portfolioId) => {
//       nav(`/portfolio/${portfolioId}`)
//     };

//     const portfolio = user?.portfolios.map((p) => (
//       <div key={p.id} onClick={() => handleClick(p.id)}>
//         <p>Portfolio ID: {p.id}</p>
//       </div>
//     ));
//       console.log(user)
//     portfolioContent = (
//       <div>
//         <h5>Your Stocks:</h5>
//         <h6>{portfolio}</h6>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {portfolioContent}
//     </div>
//   );
// }

// export default Portfolio;





















// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function Portfolio({ user }) {
//   let nav = useNavigate()
//   const { portfolioId } = useParams();
//   const [stocks, setStocks] = useState([]);

//   useEffect(() => {
//     // Fetch portfolio details if a portfolio ID is present
//     if (portfolioId) {
//       fetch(`http://localhost:5555/portfolio/${portfolioId}/stocks`)
//         .then((res) => res.json())
//         .then((data) => setStocks(data))
//         .catch((error) => console.error(error));
//     }
//   }, [portfolioId]);

//   let portfolioContent;

//   if (portfolioId) {
//     // If a portfolio ID is present, render portfolio details
//     const stocksJsx = stocks.map((stock, index) => (
//       <div key={index}>
//         <p>{stock.name}</p>
//         <p>{stock.current_dividend_yield}</p>
//         <p>{stock.market_percentage_variation}</p>
//       </div>
//     ));

//     portfolioContent = (
//       <div>
//         {stocksJsx}
//       </div>
//     );
//   } else {
//     // Otherwise, render the list of portfolios
//     const handleClick = (portfolioId) => {
//       nav(`/portfolio/${portfolioId}`)
//     };

//     const portfolio = user?.portfolios.map((p) => (
//       <div key={p.id} onClick={() => handleClick(p.id)}>
//         <p>Portfolio ID: {p.id}</p>
//       </div>
//     ));

//     portfolioContent = (
//       <div>
//         <h5>Your Stocks:</h5>
//         <h6>{portfolio}</h6>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {portfolioContent}
//     </div>
//   );
// }

// export default Portfolio;

