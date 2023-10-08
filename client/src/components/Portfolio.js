import React, { useEffect, useState } from "react";
import "./cssInfo/Portfolio.css";

function Portfolio({ user }) {
  const [portfolioStocks, setPortfolioStocks] = useState([]);

  useEffect(() => {
    const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

    if (Array.isArray(portfolioStocksData)) {
      setPortfolioStocks(portfolioStocksData);
    }
  }, [user]);



  return (
    <div className="portfolio-page">
      <h4 className="portfolio-heading">Portfolio Page:</h4>
      {portfolioStocks.length > 0 ? (
        <div className="card-container">
          {portfolioStocks.map((portfolioStock, index) => (
            <div key={index} className="portfolio-card">
              <div className="stock-info">
                <p className="company">Company: {portfolioStock.stock.name}</p>
                <p className="company">Symbol: {portfolioStock.stock.symbol}</p>
                <p className="company">Sector: {portfolioStock.stock.sector}</p>
                <p className="dividend-yield">Current Dividend Yield: {portfolioStock.stock.current_dividend_yield}</p>
                <p className="percentage-variation">Market Percentage Variation: {portfolioStock.stock.market_percentage_variation}</p>
              </div>
              <div className="shares-info">
                <p className="quantity">Shares Quantity: {portfolioStock.shares_quantity}</p>
                <p className="price-per-share">Price per Share: ${portfolioStock.price_per_share}</p>
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-shares-message-container">
          <h5 className="no-shares-message">
            You currently do not have shares added. 
            <p>Please visit Buy Stocks to add shares to your portfolio.</p>
          </h5>
        </div>  
      )}
    </div>
  );
  
  
}

export default Portfolio;





//backup
// import React, { useEffect, useState } from "react";
// import "./cssInfo/Portfolio.css";

// function Portfolio({ user }) {
//   const [portfolioStocks, setPortfolioStocks] = useState([]);

//   useEffect(() => {
//     const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

//     if (Array.isArray(portfolioStocksData)) {
//       setPortfolioStocks(portfolioStocksData);
//     }
//   }, [user]);



//   return (
//     <div className="portfolio-page">
//       <h4 className="portfolio-heading">Portfolio Page:</h4>
//       {portfolioStocks.length > 0 ? (
//         <div className="card-container">
//           {portfolioStocks.map((portfolioStock, index) => (
//             <div key={index} className="portfolio-card">
//               <div className="stock-info">
//                 <p className="company">Company: {portfolioStock.stock.name}</p>
//                 <p className="company">Symbol: {portfolioStock.stock.symbol}</p>
//                 <p className="company">Sector: {portfolioStock.stock.sector}</p>
//                 <p className="dividend-yield">Current Dividend Yield: {portfolioStock.stock.current_dividend_yield}</p>
//                 <p className="percentage-variation">Market Percentage Variation: {portfolioStock.stock.market_percentage_variation}</p>
//               </div>
//               <div className="shares-info">
//                 <p className="quantity">Shares Quantity: {portfolioStock.shares_quantity}</p>
//                 <p className="price-per-share">Price per Share: ${portfolioStock.price_per_share}</p>
//                 {/* <p className="divider">------------------------------------</p> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h5 className="no-shares-message">
//           You currently do not have shares added. Please visit Buy Stocks to add shares to your portfolio.
//         </h5>
//       )}
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

