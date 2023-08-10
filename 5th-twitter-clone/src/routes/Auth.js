import { authService } from "../myFirebase";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        }
        else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        // 로그인 / 계정생성 후 persistence 관리
        // 따로 관리를 해주지 않으면 default 값은 Local
        // local, session, none 세 가지 중 하나 선택 가능
        try {
            let data;
            if (newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (err) { // 가입된 이메일 계정이 이미 있을때
            setError(err.message);
        }
    };

    const toggleAccount = () => setNewAccount(prev => !prev);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth;