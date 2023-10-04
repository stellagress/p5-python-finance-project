import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



function PortfolioDetails(){

    let {portfolioId} = useParams()
    const [stocks, setStocks] = useState([])
    
    

    useEffect(()=>{
        fetch(`http://localhost:5555/portfolio/${portfolioId}/stocks`)
        .then(res=>res.json())
        .then(data=>setStocks(data))
        .catch(error=>console.error(error))
    },[portfolioId])


    // console.log(stocks)
    const stocksJsx = stocks.map((stock, index)=>{
        return <div key={index}>
            <p>{stock.name} </p>
            <p>{stock.current_dividend_yield}</p>
        
        </div>
    })
 

    // const users = [
    //     { id: 1, firstName: "Duane", lastName: "Watson" },
    //     { id: 2, firstName: "Duane", lastName: "Johnson" },
    //   ];
      
    //   const userHeadings = users.map((user) => {
    //     return <h1 key={user.id}>{user.firstName}</h1>;
    //   });


    return(
        <div>
            {stocksJsx}

        </div>
    )
}


export default PortfolioDetails;