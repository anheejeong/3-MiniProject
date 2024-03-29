import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useNavigate()

    async function submit(e) {
        e.preventDefault()

        try {
            await axios.post('http://localhost:8000/signup', {
                email, password
            })
                .then(res => {
                    if (res.data == 'exist') {
                        // history('/home', { state: { id: email } })
                        alert('User already exists')
                    }
                    else if (res.data == 'notexist') {
                        // alert('User have not sign up')
                        history('/home', { state: { id: email } })
                    }
                })
                .catch(e => {
                    alert('wrong details')
                    console.log(e)
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="login">
            <h2>Signup</h2>

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="email" name="" id="" />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" name="" id="" />

                <input type="submit" onClick={submit} />
            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to='/'>Login Page</Link>

        </div>
    );
}

export default Login;