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


    console.log(stocks)


 


    return(
        <div>
            {portfolioId}

        </div>
    )
}


export default PortfolioDetails;