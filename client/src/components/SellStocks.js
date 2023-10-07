import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./cssInfo/SellStocks.css";


function SellStocks({ user }) {
  const [portfolioStocks, setPortfolioStocks] = useState([]);

  useEffect(() => {
    const portfolioStocksData = user?.portfolios[0]?.portfolio_stocks;

    if (Array.isArray(portfolioStocksData)) {
      setPortfolioStocks(portfolioStocksData);
    }
  }, [user]);


  const handleClickButton = (portfolioStock, index) => {
    console.log("Button Clicked");
    let id = portfolioStock.id;
    let portfolioId = portfolioStock.portfolio_id;
  
    
    const remainingSharesElement = document.getElementById(`remainingShares${index}`);
    if (!remainingSharesElement) {
      console.log('Remaining shares element not found.');
      return;
    }
  
    const remainingShares = parseFloat(remainingSharesElement.textContent.split(': ')[1]);
  
    if (remainingShares > 0) {
     
      fetch(`/portst/${id}/portfolio/${portfolioId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shares_quantity: remainingShares }),
      })
        .then((response) => {
          if (response.status === 200) {
            console.log('Successfully updated.');
            
          } else if (response.status === 404) {
            console.log('Resource not found.');
          } else {
            console.log('Failed to update.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else if (remainingShares === 0) {
      
      fetch(`/portst/${id}/portfolio/${portfolioId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
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
    } else {
      console.log('Invalid remaining shares value.');
    }
  };
  
  

  return (
    <div>
      <h4 className="page-heading">Sell Stocks Page:</h4>
  
      <ul className="portfolio-list">
        {portfolioStocks.map((portfolioStock, index) => (
          <li key={index} className="portfolio-item">
            <div className="portfolio-details">
              <p className="portfolio-info">Company: {portfolioStock.stock.name}</p>
              <p className="portfolio-info">Current Dividend Yield: {portfolioStock.stock.current_dividend_yield}</p>
              <p className="portfolio-info">Market Percentage Variation: {portfolioStock.stock.market_percentage_variation}</p>
            </div>
            <div className="portfolio-actions">
              <p className="portfolio-info">Shares Quantity: {portfolioStock.shares_quantity}</p>
              <p className="portfolio-info">Price per Share: ${portfolioStock.price_per_share}</p>
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
                          setFieldValue("quantity", enteredValue);
                          const remainingShares = portfolioStock.shares_quantity - enteredValue;
                          document.getElementById(`remainingShares${index}`).textContent = `Remaining Shares After Transaction: ${remainingShares}`;
                        }
                      }}
                      className="input-field"
                    />
                    <ErrorMessage name="quantity" component="div" className="error-message" />
                    <button type="submit" onClick={() => handleClickButton(portfolioStock, index)} className="sell-button">
                      Sell
                    </button>
                  </Form>
                )}
              </Formik>
              <p id={`remainingShares${index}`} className="remaining-shares">
                Remaining Shares After Transaction: {portfolioStock.shares_quantity}
              </p>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default SellStocks;







// //backup:
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


//   const handleClickButton = (portfolioStock, index) => {
//     console.log("Button Clicked");
//     let id = portfolioStock.id;
//     let portfolioId = portfolioStock.portfolio_id;
  
    
//     const remainingSharesElement = document.getElementById(`remainingShares${index}`);
//     if (!remainingSharesElement) {
//       console.log('Remaining shares element not found.');
//       return;
//     }
  
//     const remainingShares = parseFloat(remainingSharesElement.textContent.split(': ')[1]);
  
//     if (remainingShares > 0) {
     
//       fetch(`/portst/${id}/portfolio/${portfolioId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ shares_quantity: remainingShares }),
//       })
//         .then((response) => {
//           if (response.status === 200) {
//             console.log('Successfully updated.');
            
//           } else if (response.status === 404) {
//             console.log('Resource not found.');
//           } else {
//             console.log('Failed to update.');
//           }
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     } else if (remainingShares === 0) {
      
//       fetch(`/portst/${id}/portfolio/${portfolioId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => {
//           if (response.status === 204) {
//             console.log('Successfully deleted.');
           
//           } else if (response.status === 404) {
//             console.log('Resource not found.');
//           } else {
//             console.log('Failed to delete.');
//           }
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     } else {
//       console.log('Invalid remaining shares value.');
//     }
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
//               <p>Price per Share: ${portfolioStock.price_per_share}</p>
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
//       setFieldValue("quantity", enteredValue);
//       const remainingShares = portfolioStock.shares_quantity - enteredValue;
//       document.getElementById(`remainingShares${index}`).textContent = `Remaining Shares After Transaction: ${remainingShares}`;
//     }
//   }}
// />
//                     <ErrorMessage name="quantity" component="div" className="error" style={{ color: "red" }} />
//                     <button type="submit" onClick={() => handleClickButton(portfolioStock, index)}>
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