
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./login.css"

const Login = () => {
  const [unique, setUnique] = useState("")
  const [password, setPassword] = useState("")

  const [login, setLogin] = useState({})
  const Navigate = useNavigate()

  useEffect(() => {
    fetch("https://courier-orders-1bdb1-default-rtdb.firebaseio.com/registration.json")
      .then(res => res.json())
      .then(res => {
        setLogin(res)
        console.log(res)
      })
      .catch(err => console.log(err.message))
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(login)
   const [data] =Object.keys(login).filter((key) => login[key].email  === unique  || login[key].phone === unique  ) 
   console.log(data)
    console.log(login[data])
   if(login[data] == undefined){
      window.alert(" email not registerd")
   }  
   else if ((login[data].password === password && login[data].email === unique) || (login[data].password === password && login[data].phone === unique)  ) {
      window.alert(`${login[data].username} you are succesfully login`)
      localStorage.setItem("useremail", unique)
      sessionStorage.setItem("userpassword",password)
      Navigate("/action")
    }

    else if (login[data].email = unique) {
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
            <button className="register-button">Register</button>
          </Link>

        </div>
        <div className="right-side">
          <h3 className="right-heading">Log in</h3>
          <form className="form" onSubmit={handleLogin}>
            <input type={"text"} placeholder="Enter your email or phone no." required className="input-field" value={unique}
              onChange={(e) => setUnique(e.target.value)} />
            <input type="password" placeholder="Password" className="input-field" required value={password}
              onChange={(e) => setPassword(e.target.value)} />
             <Link to="/forgot"><span className="forgot-span">Forgot Password?</span></Link> 
            <button className="submit-button" type="submit">Log in</button>
          </form>
        </div>

      </div>
    </div>

  )
}

export default Login
