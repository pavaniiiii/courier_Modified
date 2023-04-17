import React, { Component, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./forgotPaswd.css"

function ForgotPaswd() {
    const Navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [forgot, setForgot] = useState({})
    const [display, setDisplay] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
        conpassword: ""
    })

    useEffect(() => {
        fetch("https://courier-orders-1bdb1-default-rtdb.firebaseio.com/registration.json")
            .then(res => res.json())
            .then(res => {
                setForgot(res)
                console.log(res)
            })
            .catch(err => console.log(err.message))
    }, [errors])

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        setErrors(validate(data))
        setDisplay(true)
    }

    const validate = (values) => {
        const err = {}
        const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const emailValidation = /^([A-Z0-9._%+-]{4,})+@([A-Z0-9.-]{4,})+\.[A-Z]{2,4}$/i;

        if (!values.email) {
            err.email = "Enter your Email"
        } else if (!emailValidation.test(values.email)) {
            err.email = "Enter valid email id"
        }
        if (!values.password) {
            err.password = "Enter your password"
        } else if (!passwordValid.test(values.password)) {
            err.password = "Password is not strong"
        }
        if (!values.conpassword) {
            err.conpassword = "Enter your confirm password"
        } else if (values.password !== values.conpassword) {
            err.conpassword = "Confirm password is not match"
        }
        return err;
    }

    useEffect(() => {
        if (Object.keys(errors).length == 0 && display) {
            const [key] = Object.keys(forgot).filter((key) => forgot[key].email === data.email)
            console.log(key)

            const newValues = {
                email: data.email,
                cpassword: data.conpassword,
                password: data.password,
                username: (forgot[key]) ? forgot[key].username : "",
                phone: (forgot[key]) ? forgot[key].phone : ""
            }
            if (key === undefined) {
                window.alert("Your email id is not registerd")
                Navigate('/register')
            }

            else if (key.length >= 1) {
                fetch(`https://courier-orders-1bdb1-default-rtdb.firebaseio.com/registration/${key}.json`, {
                    method: "PUT",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(newValues)
                })
                    .then(res => {
                        return res.json()
                    })
                    .then(json => {
                        console.log(json)
                        window.alert(`${forgot[key].username} you are Successfully changed your password`)
                        Navigate("/login")
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

        }
    },[errors])

    return (
        <div>
            <div className="forgot-main">
                <h3 className="forgot-heading">Find your Account</h3>
                <form className="forgot-form" onSubmit={submitHandler}>
                    <div className='forgot-group'>
                        <label className="forgot-label" >Email Adress:</label>
                        <input type={"text"} placeholder="Enter your email adress" name="email" className="forgot-field" value={data.email} onChange={changeHandler} />
                        <p className='forgot-err'>{errors.email} </p>
                    </div>
                    <div className='forgot-group'>
                        <label className="forgot-label" >Password:</label>
                        <input type="password" placeholder="Enter your Password" className="forgot-field" name="password" value={data.password} onChange={changeHandler} />
                        <p className='forgot-err'>{errors.password}</p>
                    </div>
                    <div className='forgot-group'>
                        <label className="forgot-label" >Confirm Passsword:</label>
                        <input type="password" placeholder="Enter your confirm Password" className="forgot-field" name="conpassword" value={data.conpassword} onChange={changeHandler} />
                        <p className='forgot-err'>{errors.conpassword} </p>
                    </div>

                    <button className="submit-button" type="submit">Reset</button>
                </form>
            </div>
        </div>
    )


}

export default ForgotPaswd;