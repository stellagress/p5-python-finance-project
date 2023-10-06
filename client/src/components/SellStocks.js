import React, { useEffect, useState } from "react";

function SellStocks({ user }) {
  const [stockData, setStockData] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);


  // useEffect(() => {
  //   // Fetch the stocks data
  //   fetch(`http://localhost:5555/sell/${user?.id}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setStocks(data);
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with the fetch operation:", error);
  //     });
  // }, [user?.id]);



  useEffect(() => {
    const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

    if (portfolioStocksData) {
      setPortfolioStocks(portfolioStocksData);
    }
  }, [user]);




  console.log(user.portfolios[0].portfolio_stocks[4].stock)
  //name
  //current 







  return (
    <div>
      <h4>Sell Stocks Page:</h4>
      {/* {stocks.map((stock, index) => (
        <div key={index}>
          <p onClick={() => console.log(stock.id)}>{stock.name}</p>
          <p>{stock.current_dividend_yield}</p>
          <p>{stock.market_percentage_variation}</p>
          <p>------------------------------------</p>
        </div>
      ))} */}

        <ul>
          {portfolioStocks.map((portfolioStock, index) => (
            <li key={index}>
              <p>Shares Quantity: {portfolioStock.shares_quantity}</p>
              <p>Price per Share: {portfolioStock.price_per_share}</p>
              <p>------------------------------------</p>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default SellStocks;









// import React, { useEffect, useState } from "react";


// function SellStocks({ user }) {
//     const [stocks, setStocks] = useState([]);

//     useEffect(() => {
//         fetch(`http://localhost:5555/sell/${user?.id}`)
//           .then(response => {
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
//             return response.json();
//           })
//           .then(data => {
//             setStocks(data);
//           })
//           .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//           });
//       }, [user?.id]);


//       // console.log(user)
//       // console.log(user.portfolios[0].portfolio_stocks[3].price_per_share)

      





//    return (
//     <div>
//         <h4>Sell Stocks Page:</h4>
//         {stocks.map((stock, index) => (
//                 <div key={index}>
//                   <p onClick={()=>console.log(stock.id)}>{stock.name}</p>
//                   <p>{stock.current_dividend_yield}</p>
//                   <p>{stock.market_percentage_variation}</p>
//                   <p>------------------------------------</p>
//                 </div>
//               ))}

      
//       <div>
      
//     </div>
//     </div>
//   );
// }
// export default SellStocks;













// returns the other piece (broken)
// return (
//   <div>
//     <h4>Sell Stocks Page:</h4>
//     {stocks.map((stock, index) => (
//       <div key={index}>
//         <p onClick={() => console.log(stock.id)}>{stock.name}</p>
//         <p>{stock.current_dividend_yield}</p>
//         <p>{stock.market_percentage_variation}</p>
//         <p>------------------------------------</p>
//       </div>
//     ))}

//     <div>
//       {/* Map and display portfolio_stocks from the first portfolio */}
//       {user.portfolios[0].portfolio_stocks.map((portfolioStock, index) => (
//         <div key={index}>
//           <p>Stock ID: {portfolioStock.id}</p>
//           <p>Shares Quantity: {portfolioStock.shares_quantity}</p>
//           <p>Price per Share: {portfolioStock.price_per_share}</p>
//           <p>------------------------------------</p>
//         </div>
//       ))}
//     </div>
//   </div>
// );
