import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function SellStocks({ user }) {
  const [portfolioStocks, setPortfolioStocks] = useState([]);

  useEffect(() => {
    const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

    if (Array.isArray(portfolioStocksData)) {
      setPortfolioStocks(portfolioStocksData);
    }
  }, [user]);





  // const handleClickButton = (portfolioStock) => {
  //   console.log("Button Clicked");
  //   console.log("Portfolio_Stock ID:", portfolioStock.id);
  //   console.log("portfolio_id:", portfolioStock.portfolio_id)
  // };



  // /portst/<int:id>/portfolio/<int:portfolio_id>
  // const handleClickButton = (portfolioStock) => {
  //   console.log("Button Clicked");
  //   let id =  portfolioStock.id
  //   let portfolioId = portfolioStock.portfolio_id

  //   const response = await fetch(`/portst/${id}/portfolio/${portfolioId}`, {
  //     method: "DELETE",
  //   });
  //     if (response.ok) {
  //       handleDeletePlant(id);
  //       alert("Deleted Successfully 🌼")
  //     }
  // }
  // };


    const handleClickButton = (portfolioStock) => {
    console.log("Button Clicked");
    let id =  portfolioStock.id
    let portfolioId = portfolioStock.portfolio_id

    fetch(`/portst/${id}/portfolio/${portfolioId}`, {
      method: 'DELETE',
      headers:{
        'Content-Type' : 'application/json',
      }
    })
    .then((response) => {
      if (response.status === 204) {
        console.log('Successfully deleted.');
      } else if (response.status === 404) {
        console.log('Resource not found.');
      } else {
        console.log('Failed to delete.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
 
  };




 

  


  





  return (
    <div>
      <h4>Sell Stocks Page:</h4>

      <ul>
        {portfolioStocks.map((portfolioStock, index) => (
          <li key={index}>
            <div>
              <p>Company: {portfolioStock.stock.name}</p>
              <p>Current Dividend Yield: {portfolioStock.stock.current_dividend_yield}</p>
              <p>Market Percentage Variation: {portfolioStock.stock.market_percentage_variation}</p>
            </div>
            <div>
              <p>Shares Quantity: {portfolioStock.shares_quantity}</p>
              <p>Price per Share: {portfolioStock.price_per_share}</p>
              <Formik
                initialValues={{
                  quantity: "",
                }}
                validationSchema={Yup.object().shape({
                  quantity: Yup.number()
                    .min(0, "Quantity cannot be negative")
                    .test("max", "Quantity exceeds available shares", function (value) {
                      const enteredQuantity = parseFloat(value);
                      return enteredQuantity <= portfolioStock.shares_quantity;
                    })
                    .required("Quantity is required"),
                })}
                onSubmit={(values, { resetForm }) => {
                  // Handle selling logic here (not shown in this example)
                  resetForm();
                }}
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form>
<Field
  type="number"
  name="quantity"
  placeholder="Enter quantity to sell"
  onChange={(e) => {
    const enteredValue = parseFloat(e.target.value);
    if (!isNaN(enteredValue)) {
      // Ensure the entered value is a valid number
      setFieldValue("quantity", enteredValue);
      // Calculate remaining shares and update the display
      const remainingShares = portfolioStock.shares_quantity - enteredValue;
      document.getElementById(`remainingShares${index}`).textContent = `Remaining Shares After Transaction: ${remainingShares}`;
    }
  }}
/>
                    <ErrorMessage name="quantity" component="div" className="error" style={{ color: "red" }} />
                    <button type="submit" onClick={() => handleClickButton(portfolioStock)}>
                      Sell
                    </button>
                  </Form>
                )}
              </Formik>
              <p id={`remainingShares${index}`}>Remaining Shares After Transaction: {portfolioStock.shares_quantity}</p>
              <p>------------------------------------</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SellStocks;











 // console.log(user.portfolios[0].portfolio_stocks[4].stock)
//console.log(portfolioStock.stock.id)
//  console.log(user.portfolios[0].portfolio_stocks)



// import React, { useEffect, useState } from "react";

// function SellStocks({ user }) {
//   const [portfolioStocks, setPortfolioStocks] = useState([]);
//   const [sharesToSell, setSharesToSell] = useState({});

//   useEffect(() => {
//     const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

//     if (Array.isArray(portfolioStocksData)) {
//       setPortfolioStocks(portfolioStocksData);
//     }
//   }, [user]);

//   const calculateRemainingShares = (stockId) => {
//     const enteredQuantity = parseInt(sharesToSell[stockId] || 0, 10);
//     const stock = portfolioStocks.find((stock) => stock.stock.id === stockId);
//     const currentQuantity = stock.shares_quantity;

//     return currentQuantity - enteredQuantity;
//   };

//   const handleSellButton = (stockId) => {
//     console.log("Selling...");
//     // You can perform the selling logic here
//   };

//   const handleInputChange = (event, stockId) => {
//     const { value } = event.target;

//     // Update the shares to sell
//     setSharesToSell({
//       ...sharesToSell,
//       [stockId]: value,
//     });
//   };

//   return (
//     <div>
//       <h4>Sell Stocks Page:</h4>

//       <ul>
//         {portfolioStocks.map((portfolioStock, index) => (
//           <li key={index}>
//             <div>
//               <p>Company: {portfolioStock.stock.name}</p>
//               <p>Current Dividend Yield: {portfolioStock.stock.current_dividend_yield}</p>
//               <p>Market Percentage Variation: {portfolioStock.stock.market_percentage_variation}</p>
//             </div>
//             <div>
//               <p>Shares Quantity: {portfolioStock.shares_quantity}</p>
//               <p>Price per Share: {portfolioStock.price_per_share}</p>
//               <input
//                 type="number"
//                 placeholder="Enter quantity to sell"
//                 onChange={(event) => handleInputChange(event, portfolioStock.stock.id)}
//               />
//               <p>Total to receive: ${portfolioStock.price_per_share * (sharesToSell[portfolioStock.stock.id] || 0)}</p>
//               <p>Remaining Shares After Transaction: {calculateRemainingShares(portfolioStock.stock.id)}</p>
//               <button onClick={() => handleSellButton(portfolioStock.stock.id)}>Sell</button>
//               <p>------------------------------------</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default SellStocks;















// const handleCheckBox = (stockId) => {
//   console.log(`Stock ID: ${stockId} checked/unchecked`);
// }

// // ...

// {portfolioStocks.map((portfolioStock, index) => (
//   <li key={index}>
//     <input
//       type="checkbox"
//       onChange={() => handleCheckBox(portfolioStock.stock.id)}
//     />
//     {/* ... rest of your code */}
//   </li>
// ))}
















// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// function SellStocks({ user }) {
//   const [portfolioStocks, setPortfolioStocks] = useState([]);

//   useEffect(() => {
//     const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

//     if (Array.isArray(portfolioStocksData)) {
//       setPortfolioStocks(portfolioStocksData);
//     }
//   }, [user]);

//   return (
//     <div>
//       <h4>Sell Stocks Page:</h4>

//       <ul>
//         {portfolioStocks.map((portfolioStock, index) => (
//           <li key={index}>
//             <div>
//               <p>Company: {portfolioStock.stock.name}</p>
//               <p>Current Dividend Yield: {portfolioStock.stock.current_dividend_yield}</p>
//               <p>Market Percentage Variation: {portfolioStock.stock.market_percentage_variation}</p>
//             </div>
//             <div>
//               <p>Shares Quantity: {portfolioStock.shares_quantity}</p>
//               <p>Price per Share: {portfolioStock.price_per_share}</p>
//               <Formik
//                 initialValues={{
//                   quantity: "",
//                 }}
//                 validationSchema={Yup.object().shape({
//                   quantity: Yup.number()
//                     .min(0, "Quantity cannot be negative")
//                     .test("max", "Quantity exceeds available shares", function (value) {
//                       const enteredQuantity = parseFloat(value);
//                       return enteredQuantity <= portfolioStock.shares_quantity;
//                     })
//                     .required("Quantity is required"),
//                 })}
//                 onSubmit={(values, { resetForm }) => {
//                   // Handle selling logic here (not shown in this example)
//                   resetForm();
//                 }}
//               >
//                 {({ isSubmitting, values, setFieldValue }) => (
//                   <Form>
// <Field
//   type="number"
//   name="quantity"
//   placeholder="Enter quantity to sell"
//   onChange={(e) => {
//     const enteredValue = parseFloat(e.target.value);
//     if (!isNaN(enteredValue)) {
//       // Ensure the entered value is a valid number
//       setFieldValue("quantity", enteredValue);
//       // Calculate remaining shares and update the display
//       const remainingShares = portfolioStock.shares_quantity - enteredValue;
//       document.getElementById(`remainingShares${index}`).textContent = `Remaining Shares After Transaction: ${remainingShares}`;
//     }
//   }}
// />
//                     <ErrorMessage name="quantity" component="div" className="error" style={{ color: "red" }} />
//                     <button type="submit" disabled={isSubmitting}>
//                       Sell
//                     </button>
//                   </Form>
//                 )}
//               </Formik>
//               <p id={`remainingShares${index}`}>Remaining Shares After Transaction: {portfolioStock.shares_quantity}</p>
//               <p>------------------------------------</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default SellStocks;
 