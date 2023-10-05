
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BuyStocks({ user }) {
  const [stocks, setStocks] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    // Fetch stocks data when the component mounts
    fetch('/stocks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update the state with the fetched stock data
        setStocks(data);
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <p>Buy Stocks Page:</p>
      <div>
        {stocks.map((stock, index) => (
          <p key={index}>
            Stock Name: {stock.name}, Dividend Yield: {stock.current_dividend_yield}, Market Variation: {stock.market_percentage_variation}
          </p>
        ))}
      </div>
    </div>
  );
}

export default BuyStocks;



// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function BuyStocks({ user }) {
//   const { portfolioId } = useParams();
//   const [stocks, setStocks] = useState([]);
//   const [portfolioContent, setPortfolioContent] = useState(null);

//   const nav = useNavigate();

//   useEffect(() => {
//     // Fetch portfolio details if a portfolio ID is present
//     if (portfolioId) {
//       fetch(`http://localhost:5555/portfolio/${portfolioId}/stocks`)
//         .then((res) => res.json())
//         .then((data) => setStocks(data))
//         .catch((error) => console.error(error));
//     }
//   }, [portfolioId]);

//   useEffect(() => {
//     if (portfolioId) {
//       // If a portfolio ID is present, render portfolio details
//       const stocksJsx = stocks.map((stock, index) => (
//         <div key={index}>
//           <p>{stock.name}</p>
//           <p>{stock.current_dividend_yield}</p>
//           <p>{stock.market_percentage_variation}</p>
//         </div>
//       ));

//       setPortfolioContent(
//         <div>
//           {stocksJsx}
//         </div>
//       );
//     } else {
//       // Otherwise, render the list of portfolios
//       const handleClick = (portfolioId) => {
//         nav(`/portfolio/${portfolioId}`);
//       };

//       const portfolioElements = user?.portfolios.map((p) => (
//         <div key={p.id} onClick={() => handleClick(p.id)}>
//           <p>Buy Stocks {p.id}</p>
//         </div>
//       ));

//       setPortfolioContent(
//         <div>
//           <h5>Buy Stocks Page:</h5>
//           <h6>{portfolioElements}</h6>
//         </div>
//       );
//     }
//   }, [portfolioId, stocks, user, nav]);

//   return (
//     <div>
//       <div>{portfolioContent}</div>
//     </div>
//   );
// }

// export default BuyStocks;



// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function BuyStocks({ user }) {
//   const { portfolioId } = useParams();
//   const [stocks, setStocks] = useState([]);
//   const [portfolioContent, setPortfolioContent] = useState(null);

//   const nav = useNavigate();

//   useEffect(() => {
//     // Fetch portfolio details if a portfolio ID is present
//     if (portfolioId) {
//       fetch(`http://localhost:5555/portfolio/${portfolioId}/stocks`)
//         .then((res) => res.json())
//         .then((data) => setStocks(data))
//         .catch((error) => console.error(error));
//     }
//   }, [portfolioId]);

//   useEffect(() => {
//     if (portfolioId) {
//       // If a portfolio ID is present, render portfolio details
//       const stocksJsx = stocks.map((stock, index) => (
//         <div key={index}>
//           <p>{stock.name}</p>
//           <p>{stock.current_dividend_yield}</p>
//           <p>{stock.market_percentage_variation}</p>
//         </div>
//       ));

//       setPortfolioContent(
//         <div>
//           {stocksJsx}
//         </div>
//       );
//     } else {
//       // Otherwise, render the list of portfolios
//       const handleClick = (portfolioId) => {
//         nav(`/portfolio/${portfolioId}`);
//       };

//       const portfolioElements = user?.portfolios.map((p) => (
//         <div key={p.id} onClick={() => handleClick(p.id)}>
//           <p>Buy Stocks {p.id}</p>
//         </div>
//       ));

//       setPortfolioContent(
//         <div>
//           <h5>Please Confirm You are entering our Buy Stocks Page::</h5>
//           <h6>{portfolioElements}</h6>
//         </div>
//       );
//     }
//   }, [portfolioId, stocks, user, nav]);

//   return (
//     <div>
//       <div>{portfolioContent}</div>
//     </div>
//   );
// }

// export default BuyStocks;







// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// function BuySellStocks({user}) {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [transactionResult, setTransactionResult] = useState(null);

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   const handleTransaction = () => {
//     if (selectedOption === "") {
//       // No option selected, do nothing
//       return;
//     }

//     // Perform the transaction (you can replace this with your actual logic)
//     const transaction = selectedOption === "Buy" ? "Buy" : "Sell";
//     setTransactionResult(transaction);

//     // Log the transaction
//     console.log(`Transaction: ${transaction}`);
//   };




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
//       <h5>Select an Action:</h5>
//       <form>
//         <select value={selectedOption} onChange={handleOptionChange}>
//           <option value="" disabled hidden>
//             Select an option
//           </option>
//           <option value="Buy">Buy</option>
//           <option value="Sell">Sell</option>
//         </select>
//         <div>
//             {portfolioContent}
//         </div>
        
//       </form>
//       <button onClick={handleTransaction}>Complete Transaction</button>
//       {transactionResult ? (
        
//         <p>Congrats {user.first_name} | transaction type: {transactionResult} stocks.
//         A confirmation e-mail was sent to {user.email}</p>
//       ) : (
//         <p>Please select an option and complete the transaction.</p>
//       )}
//     </div>
//   );
// }

// export default BuySellStocks;