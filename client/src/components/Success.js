import React from "react";



function Success({user}){

    const orderNumber = Math.floor(Math.random() * 1000000)



    return(
        <div>
            <p>Thank you for business!</p>
            <p>Your Order Number: {orderNumber}</p>
            <p>Confirmation e-mail was sent to {user?.email}</p>
        </div>

    )
}





export default Success; 