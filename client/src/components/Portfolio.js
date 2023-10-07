// import React, { useEffect, useState } from "react";
// import { GiNachos } from "react-icons/gi";
// import { useNavigate } from "react-router-dom";


// function Portfolio({ user }) {
//   let nav = useNavigate()
// const { portfolioId } = useParams();
// const [stocks, setStocks] = useState([]);

//   function handleClick(portfolioId){
//     nav(`/portfolio/${portfolioId}`)
//   }
 
//   let portfolio = user?.portfolios.map(p => { 
//     return (
//       <div key={p.id} onClick={()=>handleClick(p.id)}>
//         <p>Portfolio ID: {p.id}</p>
//       </div>
//     )
//   })



//   return(
//     <div>
//       <h5>Your Stocks:</h5>
//       <h6>{portfolio}</h6>

//     </div>
//   );
// }

// export default Portfolio;







import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Portfolio({ user }) {
  let nav = useNavigate()
  const { portfolioId } = useParams();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
   
    if (portfolioId) {
      fetch(`http://localhost:5555/portfolio/${portfolioId}/stocks`)
        .then((res) => res.json())
        .then((data) => setStocks(data))
        .catch((error) => console.error(error));
    }
  }, [portfolioId]);

  let portfolioContent;

  if (portfolioId) {
   
    const stocksJsx = stocks.map((stock, index) => (
      <div key={index}>
        <p>{stock.name}</p>
        <p>{stock.current_dividend_yield}</p>
        <p>{stock.market_percentage_variation}</p>
        <p>------------------------------------</p>
      </div>
    ));

    portfolioContent = (
      <div>
        {stocksJsx}
      </div>
    );
  } else {
    
    const handleClick = (portfolioId) => {
      nav(`/portfolio/${portfolioId}`)
    };

    const portfolio = user?.portfolios.map((p) => (
      <div key={p.id} onClick={() => handleClick(p.id)}>
        <p>Portfolio ID: {p.id}</p>
      </div>
    ));
      console.log(user)
    portfolioContent = (
      <div>
        <h5>Your Stocks:</h5>
        <h6>{portfolio}</h6>
      </div>
    );
  }

  return (
    <div>
      {portfolioContent}
    </div>
  );
}

export default Portfolio;





















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

