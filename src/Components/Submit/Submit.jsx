import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./submit.css"


function Submit() {
  const Navigate =useNavigate();
    
  useEffect(()=>{
    let useremail=localStorage.getItem("useremail") 
    if(useremail=== null || useremail === "" ){
     Navigate("/login")
    }
  },[])

  const { id } = useParams();

  const [data, setData] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/couriers/" + id)
      .then(res => {
        return res.json()
      })
      .then(res => {
        return setData(res)
      })

      .catch(err => console.log(err))
  }, [])

  console.log(data)

  const handleSubmit = (e) => {
    e.preventDefault()
 
    const values = {
      "shipment": true,
      "Date": data.Date,
      "Email": data.Email,
      "Full_Name": data.Full_Name,
      "Phone_No": data.Phone_No,
      "Shipment_From": data.Shipment_From,
      "Shipment_To": data.Shipment_To,
      "Time": data.Time,
      "Tracking_Id": data.Tracking_Id,
      "Weight": data.Weight,
      "Received_Date":new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear(),
      "Received_Time":new Date().getHours()+":"+new Date().getMinutes()
    }
      if (window.confirm(`courier is received to ${data.Shipment_To} ?`)){
    axios.put(`http://localhost:5000/couriers/${id}`, values)
      .then((data) => {
        console.log(data) 
        window.alert("Thanks for receiving the courier from our service")
        Navigate("/action")

      })
      .catch(err => {
        console.log(err.message)
      })  
    }    
  }
    
  return (
    <div className='tracking'>
      <img src="https://gbquotes.com/wp-content/uploads/2017/05/courier-van.jpg" width={"100%"} height="500px" alt="" className='tracking-img' />
      <h2 className='tracking-main'>Confirmation of courier received by customer</h2>

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
            <span>{(data.shipment) ? <span className='btn btn-success'>Delivered</span> : <span className='btn btn-secondary' >Pending</span> } </span>
          </div>  
        </div>
        <div className='right'>
          <h4>User-Profile</h4>
       <a href='https://picsum.photos/536/354' target={"_blank"} > <img  src='https://picsum.photos/536/354' className='person-logo'/></a>
        </div>
      </div>
      <div className='update'>
      {<Link to={"/action"}> <button  className="move-to-action" >&lt;Back</button> </Link> }
        {<button onClick={handleSubmit} className="status-change"  >Submit&gt;</button>}
      </div>
      <br/>   <br/>
    </div> 
  )
}


export default Submit