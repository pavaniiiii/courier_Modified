
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./login.css"

const Login = () => {
  const [unique, setUnique] = useState("")
  const [password, setPassword] = useState("")

  const [login, setLogin] = useState({})
  const Navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:7000/registration/")
      .then(res => res.json())
      .then(res => {
        setLogin(res)
      })
      .catch(err => console.log(err.message))
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();
   const [data] = login.filter((items) => items.email  === unique  || items.phone === unique  ) 
    console.log(data)
   if(data == undefined){
      window.alert("Your email not registerd")
   }
   else if ((data.password === password && data.email === unique) || (data.password === password && data.phone === unique)  ) {
      window.alert("You are succesfully login")
      localStorage.setItem("useremail", unique)
      sessionStorage.setItem("userpassword",password)
      Navigate("/action")
    }

    else if (data.email = unique) {
      window.alert("Password is not correct")
    }
    else {
      window.alert("Username or password is not registerd")
    }

  }

  return (
    <div className="login">
      <div className="card-login">
        <div className="left-side">
          <h2 className="login-left-heading">SAMEDAY COURIER</h2>
          <p className="login-left-content">Same day delivery courier service is a type of delivery service in which packages and documents are delivered on the same day they are shipped. This service is generally used for urgent or time-sensitive deliveries. In India, many companies offer same-day delivery services nationally and internationally. Our operations, infrastructure and technology enable our customers to transact with us and our partners at low costs.</p>

          <span className="login-left-span">Don't you have any account?</span>
          <Link to={"/register"}>
            <button className="register-button">Register&gt;</button>
          </Link>

        </div>
        <div className="right-side">
          <h3 className="right-heading">Log in</h3>
          <form className="form" onSubmit={handleLogin}>
            <input type={"text"} placeholder="Enter your email or phone no." required className="input-field" value={unique}
              onChange={(e) => setUnique(e.target.value)} />
            <input type="password" placeholder="Password" className="input-field" required value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <button className="submit-button" type="submit">Log in</button>
          </form>
        </div>

      </div>
    </div>

  )
}

export default Login
