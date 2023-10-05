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
  
    // Check if shares_quantity and sharesP are not empty
    if (!shares_quantity || !sharesP) {
      console.error("Please enter shares quantity and price per share");
      return;
    }
  
    // Create the POST request body
    const requestBody = JSON.stringify({
      stock_id: stocks.map(stock => stock.id), // Replace with the appropriate stock IDs
      shares_quantity: shares_quantity,
      price_per_share: sharesP,
    });
  
    fetch(`/user/${user.id}/portfolio/${user.portfolios[0].id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: requestBody,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to add portfolio stock');
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
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
//   const [stocks, setStocks] = useState([]);
//   const [portfolioStocks, setPortfolioStocks] = useState([]);
//   const [total, setTotal] = useState(0); // Initialize total as 0
//   const [quantities, setQuantities] = useState({}); // Store quantities for each stock
//   const nav = useNavigate();

//   const [shares_quantity, setSharesQ] = useState("")
//   const [sharesP, setSharesP] = useState("")


//   // portfolio_id=data['portfolio_id'],
//   // stock_id=data['stock_id'],
//   // shares_quantity=data['shares_quantity'],
//   // price_per_share=data['price_per_share']


//   // Function to calculate the total when a checkbox is checked or unchecked
//   const handleCheckboxChange = (stockPrice, isChecked, stockIndex) => {
//     // Check if the checkbox is checked or unchecked and update the total accordingly
//     if (isChecked) {
//       setTotal((prevTotal) => prevTotal + parseFloat(stockPrice) * parseFloat(quantities[stockIndex] || 0));
//     } else {
//       setTotal((prevTotal) => prevTotal - parseFloat(stockPrice) * parseFloat(quantities[stockIndex] || 0));
//     }
//   };

//   // Function to handle quantity input change
//   const handleQuantityChange = (e, stockIndex) => {
//     const { value } = e.target;
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [stockIndex]: value,
//     }));

//     // Calculate and update the total based on the selected quantity and price per share
//     const stock = stocks[stockIndex];
//     const isChecked = document.getElementById(`stock-${stockIndex}`).checked;
//     if (isChecked) {
//       setTotal((prevTotal) => prevTotal - parseFloat(stock.current_price_per_share) * parseFloat(quantities[stockIndex] || 0));
//       setTotal((prevTotal) => prevTotal + parseFloat(stock.current_price_per_share) * parseFloat(value));
//     }
//   };

//   const handleBuyButtonClick = () => {
//     console.log(`buying ${total.toFixed(2)}`);
//     console.log("Quantities:", quantities); // Log quantities for each stock
  
//     // Check if shares_quantity and sharesP are not empty
//     if (!shares_quantity || !sharesP) {
//       console.error("Please enter shares quantity and price per share");
//       return;
//     }
  
//     // Create the POST request body
//     const requestBody = JSON.stringify({
//       stock_id: stocks.map(stock => stock.id), // Replace with the appropriate stock IDs
//       shares_quantity: shares_quantity,
//       price_per_share: sharesP,
//     });
  
//     fetch(`/user/${user.id}/portfolio/${user.portfolios[0].id}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'accept': 'application/json',
//       },
//       body: requestBody,
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           throw new Error('Failed to add portfolio stock');
//         }
//       })
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
  

//   useEffect(() => {
//     // Fetch stocks data when the component mounts
//     fetch('/stocks')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Update the state with the fetched stock data
//         setStocks(data);
//       })
//       .catch(error => {
//         // Handle errors
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   }, []); 



//   return (
//     <div>
//       <p>Buy Stocks Page:</p>
//       <div>
//         {stocks.map((stock, index) => (
//           <div key={index}>
//             <input
//               type="checkbox"
//               id={`stock-${index}`}
//               name={`stock-${index}`}
//               onChange={(e) => handleCheckboxChange(stock.current_price_per_share, e.target.checked, index)}
//             />
//             <label htmlFor={`stock-${index}`}>
//               Stock Name: {stock.name} - {stock.symbol} | Dividend Yield: {stock.current_dividend_yield} | Market Variation: {stock.market_percentage_variation} | ${stock.current_price_per_share}
//             </label>
//             <select
//               value={quantities[index] || ""}
//               onChange={(e) => handleQuantityChange(e, index)}
//             >
//               <option value="">Quantity</option>
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="50">50</option>
//               <option value="100">100</option>
//               {/* Add more quantity options as needed */}
//             </select>
//           </div>
//         ))}
//       </div>
//       <p>Total: ${total.toFixed(2)}</p>
//       <button onClick={handleBuyButtonClick}>Buy</button>
//     </div>
//   );
// }

// export default BuyStocks;