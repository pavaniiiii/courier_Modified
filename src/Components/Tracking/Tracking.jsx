import React from 'react'
import { useState } from 'react'
import "./tracking.css"
import { useEffect } from 'react'


export default function Tracking() {
  const [data, setData] = useState(null)
  const [trackId, setTrackId] = useState("")
  const [display, setDisplay] = useState(false)


  useEffect(() => {
    fetch("https://courier-orders-default-rtdb.firebaseio.com/couriers.json")
      .then(res => res.json())
      .then(res =>{
        setData(res)

      } )

      .catch(err => console.log(err.message))
  }, [])
 
  const submithandler = (e) => {
    e.preventDefault()
    setDisplay(true)
    console.log(Object.keys(data))
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
            {display && data && (Object.keys(data).filter((key) => data[key].Tracking_Id == trackId).length >=1)  &&
              
             <tr className='table-header'>      
              <td >Tracking_ID </td>
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

            {/* {display && data && data.filter((orders) => orders.Tracking_Id === trackId).map((id) => */}
             
          {display && data &&
           (   (Object.keys(data).filter((key) => data[key].Tracking_Id == trackId ).length >=1)?
            Object.keys(data).filter((key) => data[key].Tracking_Id == trackId ).map((id) =>         
              <tr className='border' key={id} >
                
                <td>{data[id].Tracking_Id} </td>
                <td>{data[id].Full_Name} </td>
                <td>{data[id].Email} </td>
                <td>{data[id].Phone_No} </td>
                <td>{data[id].Shipment_From} </td>
                <td>{data[id].Shipment_To} </td>
                <td>{data[id].Date} </td>
                <td>{data[id].Time} </td>
                <td>{(data[id].Received_Date) ?(data[id].Received_Date):"-" }</td>
                <td>{(data[id].Received_Time)?(data[id].Received_Time):"-" }</td>
                <td>{(data[id].shipment) ? <span className='btn btn-success'>Delivered</span> : <span className='btn btn-secondary' >Pending</span>} </td>
              </tr>) : <h2 className='error'>*** Enter tracking Id is not valid ***</h2> )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

