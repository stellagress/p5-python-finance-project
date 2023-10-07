
import React, { useEffect, useState } from "react";


function BuyStocks({ user }) {
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
      })
      .catch((error) => {
        console.error(error);
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
      <p>Buy Stocks Page:</p>
      <div>
        {stocks.map((stock) => (
          <div key={stock.id}>
            <input
              type="checkbox"
              id={`stock-${stock.id}`}
              name={`stock-${stock.id}`}
              onChange={(e) => handleCheckboxChange(stock.current_price_per_share, e.target.checked, stock.id)}
            />
            <label htmlFor={`stock-${stock.id}`}>
              ID: {stock.id} Stock Name: {stock.name} - {stock.symbol} | Dividend Yield: {stock.current_dividend_yield} | Market Variation: {stock.market_percentage_variation} | ${stock.current_price_per_share}
            </label>
            <select
              value={quantities[stock.id] || ""}
              onChange={(e) => handleQuantityChange(e, stock.id)}
            >
              <option value="">Quantity</option>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
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



