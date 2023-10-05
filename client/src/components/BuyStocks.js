
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BuyStocks({ user }) {
  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [total, setTotal] = useState(0); // Initialize total as 0
  const [quantities, setQuantities] = useState({}); // Store quantities for each stock
  const nav = useNavigate();

  const [shares_quantity, setSharesQ] = useState("")
  const [sharesP, setSharesP] = useState("")


  // portfolio_id=data['portfolio_id'],
  // stock_id=data['stock_id'],
  // shares_quantity=data['shares_quantity'],
  // price_per_share=data['price_per_share']


  // Function to calculate the total when a checkbox is checked or unchecked
  const handleCheckboxChange = (stockPrice, isChecked, stockIndex) => {
    // Check if the checkbox is checked or unchecked and update the total accordingly
    if (isChecked) {
      setTotal((prevTotal) => prevTotal + parseFloat(stockPrice) * parseFloat(quantities[stockIndex] || 0));
    } else {
      setTotal((prevTotal) => prevTotal - parseFloat(stockPrice) * parseFloat(quantities[stockIndex] || 0));
    }
  };

  // Function to handle quantity input change
  const handleQuantityChange = (e, stockIndex) => {
    const { value } = e.target;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [stockIndex]: value,
    }));

    // Calculate and update the total based on the selected quantity and price per share
    const stock = stocks[stockIndex];
    const isChecked = document.getElementById(`stock-${stockIndex}`).checked;
    if (isChecked) {
      setTotal((prevTotal) => prevTotal - parseFloat(stock.current_price_per_share) * parseFloat(quantities[stockIndex] || 0));
      setTotal((prevTotal) => prevTotal + parseFloat(stock.current_price_per_share) * parseFloat(value));
    }
  };

  const handleBuyButtonClick = () => {
    console.log(`buying ${total.toFixed(2)}`);
    console.log("Quantities:", quantities); // Log quantities for each stock
    fetch(`/user/${user.id}/portfolio/${user.portfolios[0].id}`, {
      method:'POST',
      headers:{
        "Content-Type" : "application/json",
        accept : "application/json",
      },
      body : JSON.stringify({shares_quantity, sharesP})
    })
    .then((res)=>{
      return res.json()
    })
    .then((data=>{
      console.log(data)
    }))
    .catch((error=>{
      console.error(error)
    }))
    
  };

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
  }, []); 

  // useEffect(() => {
  //   // Fetch portfolio stocks data when the component mounts
  //   fetch('/portfolio-stock')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
        
  //       return response.json();
  //     })
  //     .then(data => {
  //       // Update the state with the fetched portfolio stocks data
  //       setPortfolioStocks(data);
  //     })
  //     .catch(error => {
  //       // Handle errors
  //       console.error('There was a problem with the fetch operation:', error);
  //     });
  // }, []);

  






  return (
    <div>
      <p>Buy Stocks Page:</p>
      <div>
        {stocks.map((stock, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`stock-${index}`}
              name={`stock-${index}`}
              onChange={(e) => handleCheckboxChange(stock.current_price_per_share, e.target.checked, index)}
            />
            <label htmlFor={`stock-${index}`}>
              Stock Name: {stock.name} - {stock.symbol} | Dividend Yield: {stock.current_dividend_yield} | Market Variation: {stock.market_percentage_variation} | ${stock.current_price_per_share}
            </label>
            <select
              value={quantities[index] || ""}
              onChange={(e) => handleQuantityChange(e, index)}
            >
              <option value="">Quantity</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              {/* Add more quantity options as needed */}
            </select>
          </div>
        ))}
      </div>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleBuyButtonClick}>Buy</button>
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