import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./styles.css";

const Authentication = ({ updateUser }) => {
  const [signUp, setSignUp] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();

  const handleSignUpClick = () => setSignUp((signUp) => !signUp);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        signUp ? userData : { name: userData.name, password: userData.password }
      ),
    };

    // 📝 Handle errors in the response

    fetch(signUp ? "/users" : "/login", config)
      .then((resp) => {
        if(resp.ok){
          resp.json().then(user => {
            updateUser(user)
            navigate('/')
          })
        } else {
          resp.json().then(data => {
            setTimeout(() => {
              setErrors([])
            }, 3000)
            setErrors(data.errors)
          })
        }
      })
  };

  // .then((user) => {
  //   updateUser(user);
  //   navigate("/");
  // });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const userDataCopy = { ...userData };
    userDataCopy[name] = value;

    setUserData(userDataCopy);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        {signUp && (
          <>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </>
        )}
        <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
      </form>

      <div className="auth-errors-switch-wrapper">
        <h2 className="auth-errors">{errors.map(err => <p key={err} style={{color: "red"}}>{err}</p>)}</h2>
        <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
        <button onClick={handleSignUpClick}>
          {signUp ? "Log In!" : "Register now!"}
        </button>
      </div>
    </>
  );
};
export default Authentication;