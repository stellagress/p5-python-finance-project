import React, { useEffect, useState } from "react";

function Portfolio({ user }) {
  const [port, setPort] = useState(null);

  useEffect(() => {
    fetch("/portfolio", { method: "GET" })
      .then((r) => r.json())
      .then((data) => setPort(data));
  }, []);

  // useEffect(() => {
  //   fetch(`/portfolio?portfolio_id=${user.portfolio_id}`, { method: "GET" })
  //     .then((r) => r.json())
  //     .then((data) => setPort(data));
  // }, [user.portfolio_id]);

  return (
    <div>
      <h2>Your Stocks:</h2>
      {port ? (
        // Render the data when it's available
        <div>
          <p>Portfolio ID: {port.portfolio_id}</p>
          {/* <p>Stocks: {port.stocks}</p> */}
          {/* Add more elements to display other portfolio data */}
        </div>
      ) : (
        // Render a loading message while fetching data
        <p>Loading portfolio data...</p>
      )}
    </div>
  );
}

export default Portfolio;

