import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cssInfo/BuyStocks.css";


function BuyStocks({ user }) {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});
 

  
  const handleCheckboxChange = (stockPrice, isChecked, stockId) => {
    if (isChecked) {
      setTotal((prevTotal) => prevTotal + parseFloat(stockPrice) * parseFloat(quantities[stockId] || 0));
    } else {
      setTotal((prevTotal) => prevTotal - parseFloat(stockPrice) * parseFloat(quantities[stockId] || 0));
    }
  };

  
  const handleQuantityChange = (e, stockId) => {
    const { value } = e.target;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [stockId]: value,
    }));

    const stock = stocks.find((stock) => stock.id === stockId);
    const isChecked = document.getElementById(`stock-${stockId}`).checked;
    if (isChecked) {
      setTotal((prevTotal) => prevTotal - parseFloat(stock.current_price_per_share) * parseFloat(quantities[stockId] || 0));
      setTotal((prevTotal) => prevTotal + parseFloat(stock.current_price_per_share) * parseFloat(value));
    }
  };

  const handleBuyButtonClick = () => {
    console.log(`buying ${total.toFixed(2)}`);
    console.log("Quantities:", quantities);

    const selectedStocksData = stocks
      .map((stock) => {
        const stockId = stock.id;
        const isChecked = document.getElementById(`stock-${stockId}`).checked;
        const selectedQuantity = parseInt(quantities[stockId]) || 0;
        const pricePerShare = parseFloat(stock.current_price_per_share);

        if (isChecked && selectedQuantity > 0) {
          return {
            portfolio_id: user.id,
            stock_id: stock.id,
            shares_quantity: selectedQuantity,
            price_per_share: pricePerShare,
          };
        }

        return null;
      })
      .filter((data) => data !== null);

    const requestBody = JSON.stringify(selectedStocksData);
    console.log(requestBody);

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
        navigate('/account/confirmation');
      })
      .catch((error) => {
        return console.error(error);
      });
  };

  useEffect(() => {
    fetch('/stocks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStocks(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);



  return (
    <div>
      <div className="buy-stocks-page-with-button">
        <p className="page-heading">Buy Stocks Page:</p>
        <div className="buy-stocks-page">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Select</th> {/* Moved the <th> for selection here */}
                <th>Stock Name</th>
                <th>Stock Symbol</th>
                <th>Dividend Yield</th>
                <th>Market Variation</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id}>
                  <td>
                    <input
                      type="checkbox"
                      id={`stock-${stock.id}`}
                      name={`stock-${stock.id}`}
                      onChange={(e) =>
                        handleCheckboxChange(
                          stock.current_price_per_share,
                          e.target.checked,
                          stock.id
                        )
                      }
                    />
                  </td>
                  <td>{stock.name}</td>
                  <td>{stock.symbol}</td>
                  <td>{stock.current_dividend_yield}</td>
                  <td>{stock.market_percentage_variation}</td>
                  <td>${stock.current_price_per_share}</td>
                  <td>
                    <select
                      value={quantities[stock.id] || ""}
                      onChange={(e) => handleQuantityChange(e, stock.id)}
                      className="quantity-select"
                    >
                      <option value="">Quantity</option>
                      <option value="1">1</option>
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-text">Total: ${total.toFixed(2)}</p>
        </div>
        <button onClick={handleBuyButtonClick} className="buy-button">
          Buy
        </button>
      </div>
    </div>
  );
  
  
}

export default BuyStocks;




//backup:
// import React, { useEffect, useState } from "react";


// function BuyStocks({ user }) {
//   const [stocks, setStocks] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [quantities, setQuantities] = useState({});
 

  
//   const handleCheckboxChange = (stockPrice, isChecked, stockId) => {
//     if (isChecked) {
//       setTotal((prevTotal) => prevTotal + parseFloat(stockPrice) * parseFloat(quantities[stockId] || 0));
//     } else {
//       setTotal((prevTotal) => prevTotal - parseFloat(stockPrice) * parseFloat(quantities[stockId] || 0));
//     }
//   };

  
//   const handleQuantityChange = (e, stockId) => {
//     const { value } = e.target;
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [stockId]: value,
//     }));

//     const stock = stocks.find((stock) => stock.id === stockId);
//     const isChecked = document.getElementById(`stock-${stockId}`).checked;
//     if (isChecked) {
//       setTotal((prevTotal) => prevTotal - parseFloat(stock.current_price_per_share) * parseFloat(quantities[stockId] || 0));
//       setTotal((prevTotal) => prevTotal + parseFloat(stock.current_price_per_share) * parseFloat(value));
//     }
//   };

//   const handleBuyButtonClick = () => {
//     console.log(`buying ${total.toFixed(2)}`);
//     console.log("Quantities:", quantities);

//     const selectedStocksData = stocks
//       .map((stock) => {
//         const stockId = stock.id;
//         const isChecked = document.getElementById(`stock-${stockId}`).checked;
//         const selectedQuantity = parseInt(quantities[stockId]) || 0;
//         const pricePerShare = parseFloat(stock.current_price_per_share);

//         if (isChecked && selectedQuantity > 0) {
//           return {
//             portfolio_id: user.id,
//             stock_id: stock.id,
//             shares_quantity: selectedQuantity,
//             price_per_share: pricePerShare,
//           };
//         }

//         return null;
//       })
//       .filter((data) => data !== null);

//     const requestBody = JSON.stringify(selectedStocksData);
//     console.log(requestBody);

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
//     fetch('/stocks')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setStocks(data);
//       })
//       .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <p>Buy Stocks Page:</p>
//       <div>
//         {stocks.map((stock) => (
//           <div key={stock.id}>
//             <input
//               type="checkbox"
//               id={`stock-${stock.id}`}
//               name={`stock-${stock.id}`}
//               onChange={(e) => handleCheckboxChange(stock.current_price_per_share, e.target.checked, stock.id)}
//             />
//             <label htmlFor={`stock-${stock.id}`}>
//               ID: {stock.id} Stock Name: {stock.name} - {stock.symbol} | Dividend Yield: {stock.current_dividend_yield} | Market Variation: {stock.market_percentage_variation} | ${stock.current_price_per_share}
//             </label>
//             <select
//               value={quantities[stock.id] || ""}
//               onChange={(e) => handleQuantityChange(e, stock.id)}
//             >
//               <option value="">Quantity</option>
//               <option value="1">1</option>
//               <option value="5">5</option>
//               <option value="10">10</option>
//               <option value="50">50</option>
//               <option value="100">100</option>
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










// //backup recente
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./cssInfo/BuyStocks.css";


// function BuyStocks({ user }) {
//   const navigate = useNavigate();
//   const [stocks, setStocks] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [quantities, setQuantities] = useState({});
 

  
//   const handleCheckboxChange = (stockPrice, isChecked, stockId) => {
//     if (isChecked) {
//       setTotal((prevTotal) => prevTotal + parseFloat(stockPrice) * parseFloat(quantities[stockId] || 0));
//     } else {
//       setTotal((prevTotal) => prevTotal - parseFloat(stockPrice) * parseFloat(quantities[stockId] || 0));
//     }
//   };

  
//   const handleQuantityChange = (e, stockId) => {
//     const { value } = e.target;
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [stockId]: value,
//     }));

//     const stock = stocks.find((stock) => stock.id === stockId);
//     const isChecked = document.getElementById(`stock-${stockId}`).checked;
//     if (isChecked) {
//       setTotal((prevTotal) => prevTotal - parseFloat(stock.current_price_per_share) * parseFloat(quantities[stockId] || 0));
//       setTotal((prevTotal) => prevTotal + parseFloat(stock.current_price_per_share) * parseFloat(value));
//     }
//   };

//   const handleBuyButtonClick = () => {
//     console.log(`buying ${total.toFixed(2)}`);
//     console.log("Quantities:", quantities);

//     const selectedStocksData = stocks
//       .map((stock) => {
//         const stockId = stock.id;
//         const isChecked = document.getElementById(`stock-${stockId}`).checked;
//         const selectedQuantity = parseInt(quantities[stockId]) || 0;
//         const pricePerShare = parseFloat(stock.current_price_per_share);

//         if (isChecked && selectedQuantity > 0) {
//           return {
//             portfolio_id: user.id,
//             stock_id: stock.id,
//             shares_quantity: selectedQuantity,
//             price_per_share: pricePerShare,
//           };
//         }

//         return null;
//       })
//       .filter((data) => data !== null);

//     const requestBody = JSON.stringify(selectedStocksData);
//     console.log(requestBody);

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
//         navigate('/account/confirmation');
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   useEffect(() => {
//     fetch('/stocks')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setStocks(data);
//       })
//       .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   }, []);

  // return (
  //   <div>
  //     <div className="buy-stocks-page-with-button">
  //     <p className="page-heading">Buy Stocks Page:</p>
  //       <div className="buy-stocks-page">
  //         <div className="card-container">
  //           {stocks.map((stock) => (
  //             <div key={stock.id} className="stock-card">
  //               <input
  //                 type="checkbox"
  //                 id={`stock-${stock.id}`}
  //                 name={`stock-${stock.id}`}
  //                 onChange={(e) => handleCheckboxChange(stock.current_price_per_share, e.target.checked, stock.id)}
  //               />
  //               <label htmlFor={`stock-${stock.id}`} className="stock-label">
  //                 <p className="stock-info">
  //                   Company: {stock.name} - {stock.symbol}
  //                 </p>
  //                 <p className="stock-info">
  //                   Dividend Yield: {stock.current_dividend_yield}
  //                 </p>
  //                 <p className="stock-info">
  //                   Market Variation: {stock.market_percentage_variation} 
  //                 </p>
  //                 <p className="stock-info">
  //                   Price: ${stock.current_price_per_share}
  //                 </p>
  //               </label>
    
  //               <select
  //                 value={quantities[stock.id] || ""}
  //                 onChange={(e) => handleQuantityChange(e, stock.id)}
  //                 className="quantity-select"
  //               >
  //                 <option value="">Quantity</option>
  //                 <option value="1">1</option>
  //                 <option value="5">5</option>
  //                 <option value="10">10</option>
  //                 <option value="50">50</option>
  //                 <option value="100">100</option>
  //               </select>
  //             </div>
  //           ))}
  //         </div>
  //         <p className="total-text">Total: ${total.toFixed(2)}</p>
  //       </div>
  //       <button onClick={handleBuyButtonClick} className="buy-button">Buy</button>
  //     </div>  
  //   </div>  
  // );
  
// }

// export default BuyStocks;




// adds one stock to user's portfolio
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function BuyStocks({ user }) {
//   const [stocks, setStocks] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [quantities, setQuantities] = useState({});
//   const nav = useNavigate();

//   // Function to calculate the total when a checkbox is checked or unchecked
//   const handleCheckboxChange = (stockPrice, isChecked, stockId) => {
//     if (isChecked) {
//       setTotal((prevTotal) => prevTotal + parseFloat(stockPrice) * parseFloat(quantities[stockId] || 0));
//     } else {
//       setTotal((prevTotal) => prevTotal - parseFloat(stockPrice) * parseFloat(quantities[stockId] || 0));
//     }
//   };

//   // Function to handle quantity input change
//   const handleQuantityChange = (e, stockId) => {
//     const { value } = e.target;
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [stockId]: value,
//     }));

//     const stock = stocks.find((stock) => stock.id === stockId);
//     const isChecked = document.getElementById(`stock-${stockId}`).checked;
//     if (isChecked) {
//       setTotal((prevTotal) => prevTotal - parseFloat(stock.current_price_per_share) * parseFloat(quantities[stockId] || 0));
//       setTotal((prevTotal) => prevTotal + parseFloat(stock.current_price_per_share) * parseFloat(value));
//     }
//   };

//   const handleBuyButtonClick = () => {
//     console.log(`buying ${total.toFixed(2)}`);
//     console.log("Quantities:", quantities);

//     const selectedStocksData = stocks
//       .map((stock) => {
//         const stockId = stock.id;
//         const isChecked = document.getElementById(`stock-${stockId}`).checked;
//         const selectedQuantity = parseInt(quantities[stockId]) || 0;
//         const pricePerShare = parseFloat(stock.current_price_per_share);

//         if (isChecked && selectedQuantity > 0) {
//           return {
//             portfolio_id: user.id,
//             stock_id: stock.id,
//             shares_quantity: selectedQuantity,
//             price_per_share: pricePerShare,
//           };
//         }

//         return null;
//       })
//       .filter((data) => data !== null);

//     // Take the first object from the array and convert it to JSON format
//     const requestBody = JSON.stringify(selectedStocksData[0]);
//     console.log(requestBody);

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
//     fetch('/stocks')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setStocks(data);
//       })
//       .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <p>Buy Stocks Page:</p>
//       <div>
//         {stocks.map((stock) => (
//           <div key={stock.id}>
//             <input
//               type="checkbox"
//               id={`stock-${stock.id}`}
//               name={`stock-${stock.id}`}
//               onChange={(e) => handleCheckboxChange(stock.current_price_per_share, e.target.checked, stock.id)}
//             />
//             <label htmlFor={`stock-${stock.id}`}>
//               ID: {stock.id} Stock Name: {stock.name} - {stock.symbol} | Dividend Yield: {stock.current_dividend_yield} | Market Variation: {stock.market_percentage_variation} | ${stock.current_price_per_share}
//             </label>
//             <select
//               value={quantities[stock.id] || ""}
//               onChange={(e) => handleQuantityChange(e, stock.id)}
//             >
//               <option value="">Quantity</option>
//               <option value="1">1</option>
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







// css backup:

// import React, { useEffect, useState } from "react";
// import "./cssInfo/BuyStocks.css";


// function BuyStocks({ user }) {
//   const [stocks, setStocks] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [quantities, setQuantities] = useState({});
 

  
//   const handleCheckboxChange = (stockPrice, isChecked, stockId) => {
//     if (isChecked) {
//       setTotal((prevTotal) => prevTotal + parseFloat(stockPrice) * parseFloat(quantities[stockId] || 0));
//     } else {
//       setTotal((prevTotal) => prevTotal - parseFloat(stockPrice) * parseFloat(quantities[stockId] || 0));
//     }
//   };

  
//   const handleQuantityChange = (e, stockId) => {
//     const { value } = e.target;
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [stockId]: value,
//     }));

//     const stock = stocks.find((stock) => stock.id === stockId);
//     const isChecked = document.getElementById(`stock-${stockId}`).checked;
//     if (isChecked) {
//       setTotal((prevTotal) => prevTotal - parseFloat(stock.current_price_per_share) * parseFloat(quantities[stockId] || 0));
//       setTotal((prevTotal) => prevTotal + parseFloat(stock.current_price_per_share) * parseFloat(value));
//     }
//   };

//   const handleBuyButtonClick = () => {
//     console.log(`buying ${total.toFixed(2)}`);
//     console.log("Quantities:", quantities);

//     const selectedStocksData = stocks
//       .map((stock) => {
//         const stockId = stock.id;
//         const isChecked = document.getElementById(`stock-${stockId}`).checked;
//         const selectedQuantity = parseInt(quantities[stockId]) || 0;
//         const pricePerShare = parseFloat(stock.current_price_per_share);

//         if (isChecked && selectedQuantity > 0) {
//           return {
//             portfolio_id: user.id,
//             stock_id: stock.id,
//             shares_quantity: selectedQuantity,
//             price_per_share: pricePerShare,
//           };
//         }

//         return null;
//       })
//       .filter((data) => data !== null);

//     const requestBody = JSON.stringify(selectedStocksData);
//     console.log(requestBody);

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
//     fetch('/stocks')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setStocks(data);
//       })
//       .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <div className="buy-stocks-page-with-button">
//       <p className="page-heading">Buy Stocks Page:</p>
//         <div className="buy-stocks-page">
//           <div className="card-container">
//             {stocks.map((stock) => (
//               <div key={stock.id} className="stock-card">
//                 <input
//                   type="checkbox"
//                   id={`stock-${stock.id}`}
//                   name={`stock-${stock.id}`}
//                   onChange={(e) => handleCheckboxChange(stock.current_price_per_share, e.target.checked, stock.id)}
//                 />
//                 <label htmlFor={`stock-${stock.id}`} className="stock-label">
//                   <p className="stock-info">
//                     Stock Name: {stock.name} - {stock.symbol}
//                   </p>
//                   <p className="stock-info">
//                     Dividend Yield: {stock.current_dividend_yield}
//                   </p>
//                   <p className="stock-info">
//                     Market Variation: {stock.market_percentage_variation} | ${stock.current_price_per_share}
//                   </p>
//                 </label>
    
//                 <select
//                   value={quantities[stock.id] || ""}
//                   onChange={(e) => handleQuantityChange(e, stock.id)}
//                   className="quantity-select"
//                 >
//                   <option value="">Quantity</option>
//                   <option value="1">1</option>
//                   <option value="5">5</option>
//                   <option value="10">10</option>
//                   <option value="50">50</option>
//                   <option value="100">100</option>
//                 </select>
//               </div>
//             ))}
//           </div>
//           <p className="total-text">Total: ${total.toFixed(2)}</p>
//         </div>
//         <button onClick={handleBuyButtonClick} className="buy-button">Buy</button>
//       </div>  
//     </div>  
//   );
  
// }

// export default BuyStocks;