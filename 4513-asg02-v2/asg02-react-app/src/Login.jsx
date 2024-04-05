import { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import {Input} from "@nextui-org/react";


const Login = (props) => {
    //props = props.loginHandler()


    return (
        <div className="loginForm">
            <h1>F1 Data App</h1>
            <div>
                <h4>Login</h4>
                <Input isDisabled type="email" label="Email (disabled for development)" defaultValue="foo@bar.com"/>
                <Input label="Password" placeholder="Enter password" type="password"/>
                <div>
                    <Button color={"primary"} onClick={props.loginHandler}>Login</Button>
                    <Button color={"primary"} onClick={props.loginHandler}>Register</Button>
                </div>
            </div>
                
            
            <p id="login-warning">Login function still in development.</p>
            <p id="login-warning">Please press Login or Register to continue</p>
        </div>
    )
}

export default Login