
import { Route, Routes } from "react-router-dom";
import Portfolio from "./Portfolio";
import AccountNav from "./AccountNav";
import BuyStocks from "./BuyStocks";
import SellStocks from "./SellStocks";


function Account({ user }) {


    return (
        <div>
          <AccountNav user = {user}/>
    
          <Routes>

            <Route path="/account/portfolio" 
            element={<Portfolio />} user ={user}/>
    
            <Route
              path={"/account/buy_stocks"}
              element={<BuyStocks/>} user ={user}/>
    
            <Route
              path={"/account/sell_stocks"}
              element={<SellStocks/>} user ={user}/> 
     

          </Routes>
        </div>
      );
    }





export default Account;


  



// import { Route, Routes } from "react-router-dom";
// import Portfolio from "./Portfolio";
// import AccountNav from "./AccountNav";
// import BuyStocks from "./BuyStocks";
// import SellStocks from "./SellStocks";


// function Account({ user }) {


//     return (
//         <div>
//           <AccountNav user = {user}/>
    
//           <Routes>

//             <Route path="/account/portfolio" 
//             element={<Portfolio />} user ={user}/>
    
//             <Route
//               path={"/account/buy_stocks"}
//               element={<BuyStocks/>} user ={user}/>
    
//             <Route
//               path={"/account/sell_stocks"}
//               element={<SellStocks/>} user ={user}/> 
     

//           </Routes>
//         </div>
//       );
//     }





// export default Account;




