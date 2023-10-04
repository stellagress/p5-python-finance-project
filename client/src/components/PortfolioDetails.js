import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



function PortfolioDetails(){

    let {portfolio_id} = useParams()
    const [stocks, setStocks] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:5555/portfolio/${portfolio_id}/stocks`)
        .then(res=>res.json())
        .then(data=>setStocks(data))
        .catch(error=>console.error(error))
    },[portfolio_id])


    console.log(stocks)


    return(
        <div>

        </div>
    )
}


export default PortfolioDetails;