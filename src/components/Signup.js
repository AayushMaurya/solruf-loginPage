import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FaRegEye } from "react-icons/fa";
import { auth } from "../firebase";

const Signup = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isShowPass, setIsShowPass] = useState(false);

    const [signinInfo, setSinginInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setSinginInfo({
            ...signinInfo, [name]: value
        });
    }

    const formHandler = (e) => {
        e.preventDefault();
        console.log(signinInfo);

        setIsLoading(true);

        createUserWithEmailAndPassword(auth, signinInfo.email, signinInfo.password)
            .then(async (res) => {
                console.log(res);
                const user = res.user;

                await updateProfile(user, {
                    displayName: signinInfo.name
                });

                navigate("/");

                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                setIsLoading(false);
            });

    }

    return (
        <div>

            <div className="container loginForm">
                <div className="row formBody">
                    <div className="row">
                        <h3 className="clientLoginTitle">Client Signup</h3>
                    </div>

                    <form onSubmit={formHandler}>
                        <input
                            type="text"
                            name="name"
                            className="inp"
                            required
                            value={signinInfo.name}
                            onChange={changeHandler}
                            placeholder="Name"
                        />
                        <br />
                        <input
                            type="email"
                            name="email"
                            className="inp"
                            required
                            value={signinInfo.email}
                            onChange={changeHandler}
                            placeholder="Email"
                        />
                        <br />
                        <div className="row m-auto">
                            <input
                                type={isShowPass ? "text" : "password"}
                                name="password"
                                className="inp passInp"
                                required
                                value={signinInfo.password}
                                onChange={changeHandler}
                                placeholder="Password"
                            />
                            <button type="button" className="eyeBtn" onClick={() => { setIsShowPass(!isShowPass) }} > < FaRegEye size="25" /> </button>
                        </div>
                        <br />
                        <div className="row">
                            {!isLoading && (
                                <button type="submit" className="btn signupBtn">
                                    Signup
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="dont">
                        Already have an account{" "}
                        <Link to="/login" className="donts">
                            LogIn
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup;