import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BuySellForm({user}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [transactionResult, setTransactionResult] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleTransaction = () => {
    if (selectedOption === "") {
      // No option selected, do nothing
      return;
    }

    // Perform the transaction (you can replace this with your actual logic)
    const transaction = selectedOption === "Buy" ? "Buy" : "Sell";
    setTransactionResult(transaction);

    // Log the transaction
    console.log(`Transaction: ${transaction}`);
  };

  return (
    <div>
      <h5>Select an Action:</h5>
      <form>
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="" disabled hidden>
            Select an option
          </option>
          <option value="Buy">Buy</option>
          <option value="Sell">Sell</option>
        </select>
        
      </form>
      <button onClick={handleTransaction}>Complete Transaction</button>
      {transactionResult ? (
        
        <p>Congrats {user.first_name} | transaction type: {transactionResult} stocks.
        A confirmation e-mail was sent to {user.email}</p>
      ) : (
        <p>Please select an option and complete the transaction.</p>
      )}
    </div>
  );
}

export default BuySellForm;