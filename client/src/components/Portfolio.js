import React, { useEffect, useState } from "react";

function Portfolio({ user }) {
 
  let portfolio = user?.portfolios.map(p => { 
    return (
      <div key={p.id}>
        <p>Portfolio ID: {p.id}</p>
      </div>
    )
  })



  return(
    <div>
      <h2>Your Stocks:</h2>
      {portfolio}

    </div>
  );
}

export default Portfolio;

