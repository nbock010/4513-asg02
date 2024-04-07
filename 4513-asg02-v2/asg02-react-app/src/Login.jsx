import { Button } from '@nextui-org/react'
import { Input } from "@nextui-org/react";

const Login = (props) => {
    //props = props.loginHandler()
    return (
        <div className="loginForm bg-default rounded-lg">
            <h1 className='text-center'>F1 Data App</h1>
            <div>
                <h4 className='text-center'>Login</h4>
                <Input isDisabled type="email" label="Email (disabled for development)" defaultValue="foo@bar.com" />
                <Input label="Password" placeholder="Enter password" type="password" />
                <div className='flex justify-center'>
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