// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";



// function PortfolioDetails(){

//     let {portfolioId} = useParams()
//     const [stocks, setStocks] = useState([])
    
    

//     useEffect(()=>{
//         fetch(`http://localhost:5555/portfolio/${portfolioId}/stocks`)
//         .then(res=>res.json())
//         .then(data=>setStocks(data))
//         .catch(error=>console.error(error))
//     },[portfolioId])


//     // console.log(stocks)
//     const stocksJsx = stocks.map((stock, index)=>{
//         return <div key={index}>
//             <p>{stock.name} </p>
//             <p>{stock.current_dividend_yield}</p>
        
//         </div>
//     })
 




//     return(
//         <div>
//             {stocksJsx}

//         </div>
//     )
// }


// export default PortfolioDetails;