import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

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
      <form onSubmit={formik.handleSubmit}>
        {signUp && (
          <>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div style={{ color: "red" }}>{formik.errors.firstName}</div>
            ) : null}

            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div style={{ color: "red" }}>{formik.errors.lastName}</div>
            ) : null}
          </>
        )}

        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}

        <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
      </form>

      <div className="auth-errors-switch-wrapper">
        <h2 className="auth-errors">
          {errors.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))}
        </h2>
        <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
        <button onClick={() => setSignUp(!signUp)}>
          {signUp ? "Log In!" : "Register now!"}
        </button>
      </div>
    </>
  );
};

export default Authentication;






//Formik version:
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as yup from "yup";

// const Authentication = ({ updateUser }) => {
//   const navigate = useNavigate();
//   const [signUp, setSignUp] = useState(false);
//   const [errors, setErrors] = useState([]);

//   const initialValues = {
//     name: "",
//     email: "",
//     password: "",
//   };

//   const validationSchema = yup.object().shape({
//     name: yup.string().required("Username is required"),
//     password: yup.string().required("Password is required"),
//     email: signUp ? yup.string().email("Invalid email").required("Email is required") : null,
//   });

//   const onSubmit = (values) => {
//     const config = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(signUp ? values : { name: values.name, password: values.password }),
//     };

//     fetch(signUp ? "/users" : "/login", config)
//       .then((resp) => {
//         if (resp.ok) {
//           resp.json().then((user) => {
//             updateUser(user);
//             navigate("/");
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
//         <label>Username</label>
//         <input
//           type="text"
//           name="name"
//           value={formik.values.name}
//           onChange={formik.handleChange}
//         />
//         {formik.touched.name && formik.errors.name ? (
//           <div style={{ color: "red" }}>{formik.errors.name}</div>
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

//         {signUp && (
//           <>
//             <label>Email</label>
//             <input
//               type="text"
//               name="email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//             />
//             {formik.touched.email && formik.errors.email ? (
//               <div style={{ color: "red" }}>{formik.errors.email}</div>
//             ) : null}
//           </>
//         )}
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







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import "./styles.css";
// import { useFormik } from "formik";
// import * as yup from "yup";


// const Authentication = ({ updateUser }) => {
//   const [signUp, setSignUp] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState([])
//   const navigate = useNavigate();

//   const handleSignUpClick = () => setSignUp((signUp) => !signUp);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const config = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(
//         signUp ? userData : { name: userData.name, password: userData.password }
//       ),
//     };

//     // 📝 Handle errors in the response

//     fetch(signUp ? "/users" : "/login", config)
//       .then((resp) => {
//         if(resp.ok){
//           resp.json().then(user => {
//             updateUser(user)
//             navigate('/')
//           })
//         } else {
//           resp.json().then(data => {
//             setTimeout(() => {
//               setErrors([])
//             }, 3000)
//             setErrors(data.errors)
//           })
//         }
//       })
//   };



//   const handleChange = ({ target }) => {
//     const { name, value } = target;
//     const userDataCopy = { ...userData };
//     userDataCopy[name] = value;

//     setUserData(userDataCopy);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label>Username</label>
//         <input
//           type="text"
//           name="name"
//           value={userData.name}
//           onChange={handleChange}
//         />
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           value={userData.password}
//           onChange={handleChange}
//         />
//         {signUp && (
//           <>
//             <label>Email</label>
//             <input
//               type="text"
//               name="email"
//               value={userData.email}
//               onChange={handleChange}
//             />
//           </>
//         )}
//         <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
//       </form>

//       <div className="auth-errors-switch-wrapper">
//         <h2 className="auth-errors">{errors.map(err => <p key={err} style={{color: "red"}}>{err}</p>)}</h2>
//         <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
//         <button onClick={handleSignUpClick}>
//           {signUp ? "Log In!" : "Register now!"}
//         </button>
//       </div>
//     </>
//   );
// };
// export default Authentication;











// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // // import "./styles.css";
// // import { useFormik } from "formik";
// // import * as yup from "yup";


// // const Authentication = ({ updateUser }) => {
// //   const [signUp, setSignUp] = useState(false);
// //   const [userData, setUserData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //   });
// //   const [errors, setErrors] = useState([])
// //   const navigate = useNavigate();

// //   const handleSignUpClick = () => setSignUp((signUp) => !signUp);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const config = {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(
// //         signUp ? userData : { name: userData.name, password: userData.password }
// //       ),
// //     };

// //     // 📝 Handle errors in the response

// //     fetch(signUp ? "/users" : "/login", config)
// //       .then((resp) => {
// //         if(resp.ok){
// //           resp.json().then(user => {
// //             updateUser(user)
// //             navigate('/')
// //           })
// //         } else {
// //           resp.json().then(data => {
// //             setTimeout(() => {
// //               setErrors([])
// //             }, 3000)
// //             setErrors(data.errors)
// //           })
// //         }
// //       })
// //   };

// //   // .then((user) => {
// //   //   updateUser(user);
// //   //   navigate("/");
// //   // });

// //   const handleChange = ({ target }) => {
// //     const { name, value } = target;
// //     const userDataCopy = { ...userData };
// //     userDataCopy[name] = value;

// //     setUserData(userDataCopy);
// //   };

// //   return (
// //     <>
// //       <form onSubmit={handleSubmit}>
// //         <label>Username</label>
// //         <input
// //           type="text"
// //           name="name"
// //           value={userData.name}
// //           onChange={handleChange}
// //         />
// //         <label>Password</label>
// //         <input
// //           type="password"
// //           name="password"
// //           value={userData.password}
// //           onChange={handleChange}
// //         />
// //         {signUp && (
// //           <>
// //             <label>Email</label>
// //             <input
// //               type="text"
// //               name="email"
// //               value={userData.email}
// //               onChange={handleChange}
// //             />
// //           </>
// //         )}
// //         <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
// //       </form>

// //       <div className="auth-errors-switch-wrapper">
// //         <h2 className="auth-errors">{errors.map(err => <p key={err} style={{color: "red"}}>{err}</p>)}</h2>
// //         <h2>{signUp ? "Already a member?" : "Not a member?"}</h2>
// //         <button onClick={handleSignUpClick}>
// //           {signUp ? "Log In!" : "Register now!"}
// //         </button>
// //       </div>
// //     </>
// //   );
// // };
// // export default Authentication;