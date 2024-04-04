import { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'

const Login = (props) => {
    //props = props.loginHandler()


    return (
        <div className="loginForm">
            <h1>F1 Data App</h1>
            <form>
                <h2>Login</h2>
                <p id="login-warning">Login function still under construction.</p>
                <p id="login-warning">Please press Login or Register to continue to app</p>
                <div>
                    <label>Username: </label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password"></input>
                </div>
                <div>
                    <Button color={"primary"} onClick={props.loginHandler}>Login</Button>
                    <Button color={"primary"} onClick={props.loginHandler}>Register</Button>
                </div>
            </form>
        </div>
    )
}

export default Login