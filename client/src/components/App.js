import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";


import Home from "./Home";
import NavBar from "./NavBar";
import Authentication from "./Authentication";
import Account from "./Account";
import Logout from "./Logout";
import Portfolio from "./Portfolio";
import BuyStocks from "./BuyStocks";
import SellStocks from "./SellStocks";


function App() {

  const [user, setUser] = useState(null);
  const updateUser = (user) => setUser(user);

  useEffect(()=>{
    fetch('http://localhost:5555/current_user', {
      method: 'GET',
      credentials: 'include', 
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }

  })
  .then(response => response.json())
  .then(data => {
      if (data.errors) {
          console.error(data.errors);
         
      } else {
          setUser(data);
          
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
  },[])



  return (
    <div>
      <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path={"/authentication"}
            element={
              <div>
                <Authentication updateUser={updateUser}/>
              </div>
            }/>
          <Route path="/account/*" element={<Account user={user} />}/>
          <Route path="/logout" element={<Logout />} />
          <Route path="/account/buy_stocks" element={<BuyStocks user={user} />} />
          <Route path="/account/sell_stocks" element={<SellStocks user={user}/>} /> 
          <Route path="/account/portfolio" element={<Portfolio user={user}/> } />
        </Routes>
      </div>
  );
}

export default App;







// import React, { useEffect, useState } from "react";
// import { Route, Routes, Navigate } from "react-router-dom";


// import Home from "./Home";
// import NavBar from "./NavBar";
// import Authentication from "./Authentication";
// import Account from "./Account";
// import Logout from "./Logout";
// import Portfolio from "./Portfolio";
// import PortfolioDetails from "./PortfolioDetails";
// import BuyStocks from "./BuyStocks";
// import SellStocks from "./SellStocks";


// function App() {

//   const [user, setUser] = useState(null);
//   const updateUser = (user) => setUser(user);

//   useEffect(()=>{
//     fetch('http://localhost:5555/current_user', {
//       method: 'GET',
//       credentials: 'include', 
//       headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//       }

//   })
//   .then(response => response.json())
//   .then(data => {
//       if (data.errors) {
//           console.error(data.errors);
         
//       } else {
//           setUser(data);
          
//       }
//   })
//   .catch(error => {
//       console.error('Error:', error);
//   });
//   },[])






//   return (
//     <div>
//       <NavBar user={user} />

//       <Routes>
//         <Route path="/" element={<Home />} />



//         <Route
//           path={"/authentication"}
//           element={
//             <div>
//               <Authentication updateUser={updateUser}/>
//             </div>
//           }
//         />

//         <Route
//           path="/account/*"
//           element={
//             <Account user={user} />
//           }
//         />


//         <Route path="/logout" element={<Logout />} />

//         <Route path="/account/buy_stocks" element={<BuyStocks user={user} />} />
//         {/* `/user/${user.id}/portfolio/${portfolioId}` */}


          
//         <Route path="/account/sell_stocks" element={<SellStocks user={user}/>} /> 
   

        


//         {/* <Route path="/portfolio/:portfolioId" element={<PortfolioDetails/>} /> */}
//         <Route path="/portfolio/:portfolioId" element={<Portfolio/>} />

        

//         {/* <Route path="/portfolio/:portfolioId" element={<BuyStocks/>} /> */}

//       </Routes>
//     </div>
//   );
// }

// export default App;