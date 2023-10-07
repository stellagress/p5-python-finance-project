import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import "./cssInfo/Authentication.css";

const Authentication = ({ updateUser }) => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [errors, setErrors] = useState([]);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    firstName: signUp
      ? yup.string().required("First Name is required")
      : null,
    lastName: signUp
      ? yup.string().required("Last Name is required")
      : null,
    email: yup
      .string()
      .email("Invalid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const onSubmit = (values) => {
    const config = {
      method: "POST",
      credentials: 'include',  
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUp ? values : { email: values.email, password: values.password }),
    };


    fetch(signUp ? "http://localhost:5555/register" : "http://localhost:5555/login", config)
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            updateUser(user);
            navigate("/account");
          });
        } else {
          resp.json().then((data) => {
            setTimeout(() => {
              setErrors([]);
            }, 3000);
            setErrors(data.errors);
          });
        }
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
    <div className="authentication-container">
      <h2 className="login-info">Login Info</h2>
      
  
        <form onSubmit={formik.handleSubmit} className="authentication-form">
          {signUp && (
            <>
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                className="form-input"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error-message">{formik.errors.firstName}</div>
              ) : null}
  
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                className="form-input"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error-message">{formik.errors.lastName}</div>
              ) : null}
            </>
          )}
          
          <label className="form-label">Email</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="form-input"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
  
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="form-input password-input"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message password-error">{formik.errors.password}</div>
          ) : null}
  
          <input type="submit" value={signUp ? "Sign Up!" : "Log In"} className="form-button" />
        </form>
  
        <div className="auth-errors-switch-wrapper">
          <h2 className="auth-errors">
            {errors.map((err, index) => (
              <p key={index} className="error-message">
                {err}
              </p>
            ))}
          </h2>
          <h2 className="bottom-question">{signUp ? "Already a member?" : "Not a member?"}</h2>
          <button onClick={() => setSignUp(!signUp)} className="auth-toggle-button">
            {signUp ? "Log In" : "Register now!"}
          </button>
        </div>
      </div>
    </>
  );
  
};

export default Authentication;








// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as yup from "yup";

// const Authentication = ({ updateUser }) => {
//   const navigate = useNavigate();
//   const [signUp, setSignUp] = useState(false);
//   const [errors, setErrors] = useState([]);

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   };

//   const validationSchema = yup.object().shape({
//     firstName: signUp
//       ? yup.string().required("First Name is required")
//       : null,
//     lastName: signUp
//       ? yup.string().required("Last Name is required")
//       : null,
//     email: yup
//       .string()
//       .email("Invalid email")
//       .required("Email is required"),
//     password: yup.string().required("Password is required"),
//   });

//   const onSubmit = (values) => {
//     const config = {
//       method: "POST",
//       credentials: 'include',  
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(signUp ? values : { email: values.email, password: values.password }),
//     };


//     fetch(signUp ? "http://localhost:5555/register" : "http://localhost:5555/login", config)
//       .then((resp) => {
//         if (resp.ok) {
//           resp.json().then((user) => {
//             updateUser(user);
//             navigate("/account");
//           });
//         } else {
//           resp.json().then((data) => {
//             setTimeout(() => {
//               setErrors([]);
//             }, 3000);
//             setErrors(data.errors);
//           });
//         }
//       });
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//   });

//   return (
//     <>
//       <form onSubmit={formik.handleSubmit}>
//         {signUp && (
//           <>
//             <label>First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formik.values.firstName}
//               onChange={formik.handleChange}
//             />
//             {formik.touched.firstName && formik.errors.firstName ? (
//               <div style={{ color: "red" }}>{formik.errors.firstName}</div>
//             ) : null}

//             <label>Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={formik.values.lastName}
//               onChange={formik.handleChange}
//             />
//             {formik.touched.lastName && formik.errors.lastName ? (
//               <div style={{ color: "red" }}>{formik.errors.lastName}</div>
//             ) : null}
//           </>
//         )}

//         <label>Email</label>
//         <input
//           type="text"
//           name="email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//         />
//         {formik.touched.email && formik.errors.email ? (
//           <div style={{ color: "red" }}>{formik.errors.email}</div>
//         ) : null}

//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//         />
//         {formik.touched.password && formik.errors.password ? (
//           <div style={{ color: "red" }}>{formik.errors.password}</div>
//         ) : null}

//         <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
//       </form>

//       <div className="auth-errors-switch-wrapper">
//         <h2 className="auth-errors">
//           {errors.map((err, index) => (
//             <p key={index} style={{ color: "red" }}>
//               {err}
//             </p>
//           ))}
//         </h2>
//         <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
//         <button onClick={() => setSignUp(!signUp)}>
//           {signUp ? "Log In!" : "Register now!"}
//         </button>
//       </div>
//     </>
//   );
// };

// export default Authentication;