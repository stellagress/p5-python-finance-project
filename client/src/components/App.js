// import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";

// function App() {
//   return <h1>Project Client</h1>;
// }

// export default App;


import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";


import Home from "./Home";
import NavBar from "./NavBar";

function App() {





  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
          
       

      </Routes>
    </div>
  );
}

export default App;



