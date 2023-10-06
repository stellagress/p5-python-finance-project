import React, { useEffect, useState } from "react";


function SellStocks({ user }) {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5555/sell/${user?.id}`)
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
      }, [user?.id]);

      





   return (
    <div>
        <h4>Sell Stocks Page:</h4>
        {stocks.map((stock, index) => (
                <div key={index}>
                  <p onClick={()=>console.log(stock.id)}>{stock.name}</p>
                  <p>{stock.current_dividend_yield}</p>
                  <p>{stock.market_percentage_variation}</p>
                  <p>------------------------------------</p>
                </div>
              ))}

      
      <div>
      
    </div>
    </div>
  );
}
export default SellStocks;








// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function SellStocks({ user }) {

//     let nav = useNavigate()
//     const { portfolioId } = useParams();
//     const [stocks, setStocks] = useState([]);
  
//     useEffect(() => {
//       // Fetch portfolio details if a portfolio ID is present
//       if (portfolioId) {
//         fetch(`http://localhost:5555/sell/${portfolioId}`)
//           .then((res) => res.json())
//           .then((data) => setStocks(data))
//           .catch((error) => console.error(error));
//       }
//     }, [portfolioId]);
  
//     let portfolioContent;
  
//     if (portfolioId) {
//       // If a portfolio ID is present, render portfolio details
//       const stocksJsx = stocks.map((stock, index) => (
//         <div key={index}>
//           <p>{stock.name}</p>
//           <p>{stock.current_dividend_yield}</p>
//           <p>{stock.market_percentage_variation}</p>
//           <p>-------------------------</p>
//         </div>
//       ));
  
//       portfolioContent = (
//         <div>
//           {stocksJsx}
//         </div>
//       );
//     } else {
//       // Otherwise, render the list of portfolios
//       const handleClick = (portfolioId) => {
//         nav(`/sell/${portfolioId}`)
//       };
  
//       const portfolio = user?.portfolios.map((p) => (
//         <div key={p.id} onClick={() => handleClick(p.id)}>
//           <p>Portfolio ID: {p.id}</p>
//         </div>
//       ));
  
//       portfolioContent = (
//         <div>
//           <h5>Your Stocks:</h5>
//           <h6>{portfolio}</h6>
//         </div>
//       );
//     }




//   return (
//     <div>
//       <h4>Sell Stocks Page:</h4>
//       <div>
//       {portfolioContent}
//     </div>
//     </div>
//   );
// }
// export default SellStocks;
