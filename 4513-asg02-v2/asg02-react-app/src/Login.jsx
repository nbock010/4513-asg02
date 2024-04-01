import { useState, useEffect } from 'react'

const Login = (props) => {
    //props = props.loginHandler()


    return (
        <div className="loginForm">
            <h1>F1 Data App</h1>
            <form>
                <h2>Login</h2>
                <div>
                    <input type="text"></input>
                    <input type="password"></input>
                </div>
                <div>
                    <button onClick={props.loginHandler}>Login</button>
                    <button onClick={props.loginHandler}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Login