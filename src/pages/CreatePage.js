import React from "react";

function AuthPage() {
    const currentUser = localStorage.getItem('userData')
    const logOut = () => {
        localStorage.clear()
    }
    return (
        <div className="col" >
            <h2>Create page: </h2>
            <p>current User is: {currentUser}</p>
            <button onClick={logOut}>log out</button>
        </div>
    )
}

export default AuthPage;