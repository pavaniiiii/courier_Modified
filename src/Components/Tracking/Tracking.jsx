import React from 'react'
import { useState } from 'react'
import "./tracking.css"
import axios from "axios"
import { useEffect } from 'react'

export default function Tracking() {
  const [data, setData] = useState(null)
  const [trackId, setTrackId] = useState("")
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    fetch("http://localhost:5000/couriers")
      .then(res => res.json())
      .then(res => setData(res))

      .catch(err => console.log(err.message))
  }, [])

  const submithandler = (e) => {
    e.preventDefault()
    setDisplay(true)

  }
  const changeHandler = (e) => {
    setTrackId(e.target.value)
    setDisplay(false)
  }

  return (
    <div className='tracking'>
      <img src="https://gbquotes.com/wp-content/uploads/2017/05/courier-van.jpg" width={"100%"} height="500px" alt="" className='tracking-img' />
      <h2 className='tracking-main'>Track Your Device Here..!</h2>
      <div className="tracking-input" >

        <input type="text" value={trackId} onChange={changeHandler}
          className='tracking-input-text' placeholder='Enter your Tracking Id..' />
        <button onClick={submithandler} className='tracking-submit'>TRACK</button>
      </div>
      <div className='details'>
        <table className="table table-bordered table-track">
          <thead className="bg-dark text-white">
            {display && data && <tr className='table-header'>
              <td >Tracking_ID</td>
              <td>User Name</td>
              <td>Email</td>
              <td>Phone No</td>
              <td>Shipment From</td>
              <td>Shipment To</td>
              <td>Order-Date</td>
              <td>Order-Time</td>
              <td>Received-Date</td>
              <td>Received-Time</td>
              <td>Status</td>
            </tr>}
          </thead>
          <tbody>

            {display && data && data.filter((orders) => orders.Tracking_Id === trackId).map((item) =>

              <tr className='border' key={item.id} >
                <td>{item.Tracking_Id} </td>
                <td>{item.Full_Name} </td>
                <td>{item.Email} </td>
                <td>{item.Phone_No} </td>
                <td>{item.Shipment_From} </td>
                <td>{item.Shipment_To} </td>
                <td>{item.Date} </td>
                <td>{item.Time} </td>
                <td>{item.Received_Date}</td>
                <td>{item.Received_Time}</td>
                <td>{(item.shipment) ? <span className='btn btn-success'>Delivered</span> : <span className='btn btn-secondary' >Pending</span>} </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

