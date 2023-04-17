
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import "./Content.css"

const Content = () => {

    const [display, setDisplay] = useState(false)

    const [errors, setErrors] = useState({})

    const [data, setData] = useState({
        Shipment_From: "",
        Shipment_To: "",
        Weight: "",
        Full_Name: "",
        Email: "",
        Phone_No: "",
        Date: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),
        Tracking_Id: `ETH${Date.now()}`,
        Time: ((new Date().getHours()) >=12 ?(new Date().getHours()-12) : (new Date().getHours())) + ":" + new Date().getMinutes() + (new Date().getHours() >=12 ? "PM":"AM" ) ,
        shipment: false,
        Received_Date:"",
        Received_Time:""

    })



    const { Shipment_From, Shipment_To, Weight, Full_Name, Email, Phone_No, Tracking_Id } = { ...data }

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(data)
        setErrors(validate(data))
        setDisplay(true)

    }

    useEffect(() => {
        if (Object.keys(errors).length == 0 && display) {
         
            fetch("https://courier-orders-1bdb1-default-rtdb.firebaseio.com/couriers.json", {
        
                method: "POST",
                body: JSON.stringify(data)
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    // window.location.reload()
                    window.alert(`${Full_Name} Your order is sucessfully completed`)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [errors])


    const resetHandler = () => {
        window.location.reload()
    }
    const validate = (values) => {
        const err = {}
        const emailValidation=/^([A-Z0-9._%+-]{4,})+@([A-Z0-9.-]{4,})+\.[A-Z]{2,4}$/i;

       if (!values.Shipment_From) {
            err.Shipment_From = "Please enter courier shipping location..!"
        }
        if (!values.Shipment_To) {
            err.Shipment_To = "Please enter courier receiver location..!"
        }
        if (!values.Weight) {
            err.Weight = "Required courier weight(Kgs)..!"
        }
        if (!values.Email) {
            err.Email = "User email is required..! "
        } else if(!emailValidation.test(values.Email)){
           err.Email="Email is not valid" 
        }
        if (!values.Full_Name) {
            err.Full_Name = "Require user Full_Name..!"
        } else if (values.Full_Name.length < 4) {
            err.Full_Name = "Please enter minimum 4 digits"
        }
        if (!values.Phone_No) {
            err.Phone_No = "Required user Phone number..!"
        }
        return err;
    }

    return (
        <div className='container-main' >
            <img src="https://ccartoday.com/wp-content/uploads/2021/01/680-scaled.jpeg" className='form-img' alt="Image Not found" />

            <form className='form-horizontal' onSubmit={submitHandler}>
                <div className="left-content">
                    <h2 className='form-heading'>Shipment Details:</h2>
                    <div className='form-group'>
                        <label className='control-label'>Shipmet_From:</label>
                        <div className='col'>
                            <input type={"text"} className="form-control" value={Shipment_From} onChange={changeHandler} placeholder='Enter your sending adress' name='Shipment_From' />
                        </div>
                        <p className='validation'>{errors.Shipment_From}</p>
                    </div>
                    <div className='form-group'>
                        <label className='control-label'>Shipment_To:</label>
                        <div className='col'>
                            <input type={"text"} className="form-control" value={Shipment_To} onChange={changeHandler} placeholder='Enter your courier receiver adress' name='Shipment_To' />
                        </div>
                        <p className='validation'>{errors.Shipment_To}</p>
                    </div>
                    <div className='form-group'>
                        <label className='control-label'>Weight:</label>
                        <div className='col'>
                            <input type={"number"} className="form-control" step={0.1} value={Weight} min={0.1}  max={100}  onChange={changeHandler} placeholder='Enter in Kg' name='Weight' />
                        </div>
                        <p className='validation'>{errors.Weight}</p>
                    </div>
                </div>

                <div className="right">
                    <h2 className='form-heading'>Personal Details:</h2>
                    <div className='form-group'>
                        <label className='control-label'>Full Name:</label>
                        <div className='col'>
                            <input type={"text"} className="form-control" value={Full_Name} onChange={changeHandler} placeholder='Enter your Full name' name='Full_Name' />
                        </div>
                        <p className='validation'>{errors.Full_Name}</p>
                    </div>
                    <div className='form-group'>
                        <label className='control-label'>Email:</label>
                        <div className='col'>
                            <input type={"email"} className="form-control" value={Email} onChange={changeHandler} placeholder='Enter your Email' name='Email' />
                        </div>
                        <p className='validation'>{errors.Email}</p>
                    </div>
                    <div className='form-group'>
                        <label className='control-label '>Phone No:</label>
                        <div className='col'>
                            <input type={"text"} className="form-control" value={Phone_No} onChange={changeHandler} placeholder='Enter your phone no.' name='Phone_No' />
                        </div>
                        <p className='validation'>{errors.Phone_No}</p>
                    </div>
                </div>
                <div className='form-group'>
                    <div className='form-submit'>
                        <input type={"submit"} className="btn btn-success" value={"submit"} />
                    </div>
                </div>
            </form>
            <div >
                {display && Object.keys(errors).length == 0 &&

                    <div className='details'>

                        <div className='left'>
                            <div className='user-data'>
                                <h4>User name:</h4>
                                <span>{data.Full_Name} </span>
                            </div>
                            <div className='user-data'>
                                <h4>Email:</h4>
                                <span>{data.Email} </span>
                            </div>
                            <div className='user-data'>
                                <h4>Phone no:</h4>
                                <span>{data.Phone_No} </span>
                            </div>
                            <div className='user-data'>
                                <h4>Date:</h4>
                                <span>{data.Date} </span>
                            </div>

                        </div>
                        <div className='center'>
                            <div className='user-data'>
                                <h4>Tracking-Id:</h4>
                                <span>{data.Tracking_Id} </span>
                            </div>
                            <div className='user-data'>
                                <h4>Courier location:</h4>
                                <span>{data.Shipment_From} </span>
                            </div>
                            <div className='user-data'>
                                <h4>Receiver location:</h4>
                                <span>{data.Shipment_To} </span>
                            </div>
                            <div className='user-data'>
                                <h4>Status:</h4>
                                <span>{(data.shipment) ? <span className='btn btn-success'>Delivered</span> : <span className='btn btn-secondary' >Pending</span>} </span>
                            </div>
                        </div>
                         
                        <div className='reset'>
                            <button className='btn btn-danger resetbtn' onClick={resetHandler} >Reset</button>
                        </div>
                        <div className='moveto'>
                            <button className='btn btn-secondary resetbtn'><Link to="/tracking">Tracking &gt;</Link></button>
                        </div>
                        <br /><br />
                    </div>

                }
            </div>
        </div >
    )
}

export default Content


