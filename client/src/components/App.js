// import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";

// function App() {
//   return <h1>Project Client</h1>;
// }

// export default App;


import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";


import Home from "./Home";
import NavBar from "./NavBar";
import Authentication from "./Authentication";
import Account from "./Account";
import Logout from "./Logout";

function App() {

  const [user, setUser] = useState(null);





  const updateUser = (user) => setUser(user);





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
          }
        />

        <Route
          path="/account"
          element={
            <Account user={user} />
          }
        />

        <Route path="/logout" element={<Logout />} />
          
       

      </Routes>
    </div>
  );
}

export default App;





// const [user, setUser] = useState(null);

// const [firstName, setFirstName] = useState("");
// useEffect(() => {
//   // Fetch the firstName here and set it in the state
//   // For example, if you have it in your state, you can do:
//   setFirstName("John");
// }, []);


