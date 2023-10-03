import React from "react";

function Account({ user }) {
  return (
    <div>
      {user ? <p>Welcome, {user.first_name}</p> : <p>Welcome, Guest</p>}
    </div>
  );
}

export default Account;













