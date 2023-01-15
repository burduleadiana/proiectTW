import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css";
export default function Register() {
    const [isRegistering, setRegistering] = useState(true);
    const [validateEmail, setValidateEmail] = useState(false);
    const [validateRegister, setValidateRegister] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        specialty: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            user.firstName === "" ||
            user.lastName === "" ||
            user.email === "@stud.ase.ro" ||
            user.specialty === "" ||
            user.password === ""
        ) {
            setValidateRegister(true);
            console.log(validateRegister);
        } else {
            if (
                user.email.endsWith("@stud.ase.ro") === false ||
                user.email.endsWith("@stud.ase.ro") === undefined
            )
                setValidateEmail(true);
            else {
                console.log(user);
                axios.post("/api/users", user).then((response) => {
                    console.log(response.status);
                });
                setRegistering(false);
            }
        }
    };
    if (isRegistering)
        return (
            <div className="register-form">
                <form onSubmit={handleSubmit}>
                    <label>First Name </label>
                    <br />
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={(e) => (user.firstName = e.target.value)}
                    />
                    <br />
                    <label>Last Name </label>
                    <br />
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={(e) => (user.lastName = e.target.value)}
                    />{" "}
                    <br />
                    <label>Email</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => (user.email = e.target.value)}
                    />
                    <br />
                    {validateEmail && (
                        <h6>You must sign in with your institutional email ("@stud.ase.ro")</h6>
                    )}
                    <label>University profile </label>
                    <br />
                    <input
                        type="text"
                        name="specialty"
                        id="specialty"
                        onChange={(e) => (user.specialty = e.target.value)}
                    />
                    <br />
                    <label>Password </label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => (user.password = e.target.value)}
                    />{" "}
                    <br />
                    {validateRegister && (
                        <h6>
                            You need to complete all the fields!
                        </h6>
                    )}
                    <br />
                    <input
                        className="save-button"
                        type="submit"
                        value="Register"
                    />
                    <br />
                </form>
            </div>
        );
    else return <h1>You have registered succesfully!</h1>;
}
