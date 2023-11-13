
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Portfolio from "./Portfolio";
import AccountNav from "./AccountNav";
import BuyStocks from "./BuyStocks";
import SellStocks from "./SellStocks";

function Account({ user, updateUser }) {
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:5555/current_user', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.errors) {
            updateUser(data);
          }
        } else {
          console.error('Failed to fetch current user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div>
      <AccountNav user={user} />

      <Routes>
        <Route path="/account/portfolio" element={<Portfolio user={user} />} />
        <Route path="/account/buy_stocks" element={<BuyStocks user={user} />} />
        <Route path="/account/sell_stocks" element={<SellStocks user={user} />} />
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




