import React, { useEffect, useState } from "react";
import { GiNachos } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


function Portfolio({ user }) {
  let nav = useNavigate()

  function handleClick(portfolioId){
    nav(`/portfolio/${portfolioId}`)
  }
 
  let portfolio = user?.portfolios.map(p => { 
    return (
      <div key={p.id} onClick={()=>handleClick(p.id)}>
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

