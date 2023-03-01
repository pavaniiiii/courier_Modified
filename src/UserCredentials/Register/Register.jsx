import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./register.css"

function Register() {

  const[existing,setExisting]=useState({}) 
  const [errors, setErrors] = useState({})
  const [display, setDisplay] = useState(false)
  const Navigate = useNavigate()
  const [register, setRegister] = useState({
    username: "",
    email: '',
    phone: "",
    password: "",
    cpassword: ""
  })
  useEffect(()=>{
     fetch("http://localhost:7000/registration")
     .then(res=>res.json())
     .then(data=>setExisting(data))
     .catch(err=>console.log(err.message))
  },[]) 


  const changeHandler = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value })
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(register)
    setErrors(validate(register))
    setDisplay(true)

  }

  useEffect(() => {
    if (Object.keys(errors).length == 0 && display) {
       const [searchEmail] = existing.filter((users)=>users.email === register.email)
       const [searchPhone] =existing.filter((users)=>users.phone=== register.phone)

       if(searchEmail=== undefined){
         if(searchPhone === undefined){
      fetch("http://localhost:7000/registration/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(register)
      })
        .then(res => {
          return res.json()
        })
        .then(json => {
          console.log(json)
          window.alert(`${register.username} you are Successfully registered`)

          Navigate("/login")
        })
        .catch((err) => {
          console.log(err)
        })
      }else{
        window.alert(`Your phone number is already registerd with ${searchPhone.username}`)
      }
       } else{
         window.alert(`Your email id is already register with ${searchEmail.username}`)
       } 
    }
  }, [errors])


  const validate = (values) => {
    const err = {}
    const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailValidation = /^([A-Z0-9._%+-]{4,})+@([A-Z0-9.-]{4,})+\.[A-Z]{2,4}$/i;

    if (!values.username) {
      err.username = "Enter your User Name"
    }
    if (!values.email) {
      err.email = "Enter your Email"
    } else if (!emailValidation.test(values.email)) {
      err.email = "Enter valid email id"
    }
    if (!values.phone) {
      err.phone = "Enter your Phone"
    }
    if (!values.password) {
      err.password = "Enter your password"
    } else if (!passwordValid.test(values.password)) {
      err.password = "Password is not strong"
    }
    if (!values.cpassword) {
      err.cpassword = "Enter your confirm password"
    } else if (values.password !== values.cpassword) {
      err.cpassword = "Confirm password is not match"
    }
    return err;
  }



  return (
    <div className="register">
      <div className="card-register">
        <div className="left-register">
          <h3 className="left-register-heading">SAMEDAY COURIER</h3>
          <p className="left-register-para">Same day delivery many companies offer same-day delivery services nationally and internationally. Our operations, infrastructure and technology enable our customers to transact with us and our partners at low costsDelhivery’s aim is to build the operating system for commerce. We provide express parcel transportation, PTL and TL freight, cross-border and supply chain services to over 26000 customers, including large & small e-commerce participants, SMEs, and other leading enterprises. </p>
          <span className="left-register-span">You are already Registerd?</span>
          <Link to={"/login"}>
            <button className="left-register-button">Log in </button>
          </Link>
        </div>
        <div className="right-register">
          <h2 className="right-register-heading">Register</h2>
          <form className="form-register" onSubmit={submitHandler}>
            <input type={"text"} placeholder="Username" className="input-register" name="username" value={register.username} onChange={changeHandler} />
            <p className="error-text">{errors.username}</p>
            <input type="email" placeholder="email" className="input-register" name="email" value={register.email} onChange={changeHandler} />
            <p className="error-text">{errors.email}</p>
            <input type="number" placeholder="Phone-No" className="input-register" name="phone" value={register.phone} onChange={changeHandler} />
            <p className="error-text">{errors.phone}</p>
            <input type="Password" placeholder="Password" className="input-register" name="password" value={register.password} onChange={changeHandler} />
            <p className="error-text">{errors.password}</p>
            <input type="Password" placeholder="Confirm-Password" className="input-register" name="cpassword" value={register.cpassword} onChange={changeHandler} />
            <p className="error-text">{errors.cpassword}</p>
            <button className="register-submit" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
