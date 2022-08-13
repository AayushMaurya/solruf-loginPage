import React, { useState } from "react";
import { Link } from "react-router-dom";
import {auth} from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./logincss.css";

const Login = () => {

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setLoginInfo({
            ...loginInfo, [name]: value
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submition is under process");
        console.log(loginInfo);

        signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
        .then((user) => {
            console.log("user logged in");
            console.log(user);

            navigate("/");

        })
        .catch((err) =>{
            console.log(err);
        });

        setIsLoading(true);
    }

    return (
        <div>
            <div className="container loginForm">
        <div className="row formBody">
          <div className="row">
            <h3 className="clientLoginTitle">Client Login</h3>
          </div>

          <form onSubmit={submitHandler}>
            <input
              className="inp"
              type="text"
              name="email"
              onChange={changeHandler}
              value={loginInfo.email}
              placeholder="Email"
            />
            <br />
            <input
              className="inp"
              type="password"
              name="password"
              onChange={changeHandler}
              value={loginInfo.password}
              placeholder="Password"
            />
            <div className="row">
              {!isLoading && (
                <button type="submit" className="btn loginBtn">
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="row">
          <div className="dont">
            Don't have an account{" "}
            <Link to="/signup" className="donts">
              SignUp
            </Link>
          </div>
        </div>
      </div>
        </div>
    )
}

export default Login;