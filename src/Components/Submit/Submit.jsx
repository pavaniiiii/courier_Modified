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
  const [duplicate, setDuplicate] = useState({})

  useEffect(() => {
    fetch("https://courier-orders-default-rtdb.firebaseio.com/couriers.json/")
      .then(res => {
        return res.json()
      })
      .then(res => {
        return setData(res)
      })

      .catch(err => console.log(err))
  }, [])

  // console.log(data[id])

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(data[id])
    
      const values = {
      shipment: true,
      Date: data[id].Date,
      Email: data[id].Email,
      Full_Name: data[id].Full_Name,
      Phone_No: data[id].Phone_No,
      Shipment_From: data[id].Shipment_From,
      Shipment_To: data[id].Shipment_To,
      Time: data[id].Time,
      Tracking_Id: data[id].Tracking_Id,
      Weight: data[id].Weight,
      Received_Date:new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear(),
      Received_Time:new Date().getHours()+":"+new Date().getMinutes()
    }
   if(window.confirm(`The courier is delivered to ${data[id].Shipment_To}?`)){
      fetch(`https://courier-orders-default-rtdb.firebaseio.com/couriers/${id}.json`,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(values)

      })
      .then((data) => {
        console.log(data) 
        window.alert("Thanks for receiving the courier")   
        window.location.reload() 
      })
      .catch(err => {
        console.log(err.message)
      })  
    }
  }
    
  return (
    <div className='tracking'>
      <img src="https://tse2.mm.bing.net/th?id=OIP.LoCbFxc9LixdZkGH6wlAHgHaEe&pid=Api&P=0" width={"100%"} height="500px" alt="" className='tracking-img' />
      <h2 className='tracking-main'>Confirmation of courier received by customer</h2>

      {data[id] && <div className='details'>
        <div className='left'>
          <div className='user-data'>
            <h4>User name:</h4>
            <span>{data[id].Full_Name} </span>
          </div>
          <div className='user-data'>
            <h4>Email:</h4>
            <span>{data[id].Email} </span>
          </div>
          <div className='user-data'>
            <h4>Phone no:</h4>
            <span>{data[id].Phone_No} </span>
          </div>
          <div className='user-data'>
            <h4>Date:</h4>
            <span>{data[id].Date} </span>
          </div>

        </div>
        <div className='center'>
        <div className='user-data'>
            <h4>Tracking-Id:</h4>
            <span>{data[id].Tracking_Id} </span>
          </div>
          <div className='user-data'>
            <h4>Courier location:</h4>
            <span>{data[id].Shipment_From} </span>
          </div>
          <div className='user-data'>
            <h4>Receiver location:</h4>
            <span>{data[id].Shipment_To} </span>
          </div>
          <div className='user-data'>
            <h4>Status:</h4>
            <span>{(data[id].shipment) ? <span className='btn btn-success'>Delivered</span> : <span className='btn btn-secondary' >Pending</span> } </span>
          </div>  
        </div>
        <div className='right'>
          <h4>User-Profile</h4>
       <a href='https://picsum.photos/536/354' target={"_blank"} > <img  src='https://picsum.photos/536/354' className='profile-pic'/></a>
        </div>
      </div> }
      <div className='update'>
      {<Link to={"/action"}> <button  className="move-to-action" >&lt;Back</button> </Link> }
        {<button onClick={handleSubmit} className="status-change"  >Received</button>}
      </div>
      <br/>   <br/>
    </div> 
  )
}


export default Submit
