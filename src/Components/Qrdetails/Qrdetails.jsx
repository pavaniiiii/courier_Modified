import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "./Qrdetails.css"

function Qrdetails() {

  const { id } = useParams();
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(`https://courier-orders-1bdb1-default-rtdb.firebaseio.com/couriers/${id}.json`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        setData(res)
        console.log(res)
      })

      .catch(err => console.log(err))
  }, [])
  return (
    <div className='scanner'>
    
      <h2 className='qr-main'>Courier information</h2>

      {data && <div className='details'>
        <div className='main-content'>
          <div className='user-data '>
            <h4 className='profile'>{data.Full_Name }</h4>
            <span><a href='https://picsum.photos/536/354' target={"_blank"} > <img src='https://picsum.photos/536/354' className='person-logo' /></a> </span>
          </div>
          <div className='user-data'>
            <h4 className='qr-side-heading'>Email:</h4>
            <span className='qr-descr'>{data.Email} </span>
          </div>
          <div className='user-data'>
            <h4 className='qr-side-heading'>Phone no:</h4>
            <span  className='qr-descr'>{data.Phone_No} </span>
          </div>
          <div className='user-data'>
            <h4 className='qr-side-heading'>Courier location:</h4>
            <span  className='qr-descr'>{data.Shipment_From} </span>
          </div>
        
        <div className='user-data'>
            <h4 className='qr-side-heading'>Tracking-Id:</h4>
            <span  className='qr-descr'>{data.Tracking_Id} </span>
          </div>
          <div className='user-data'>
            <h4 className='qr-side-heading'>Courier-Weight:</h4>
            <span  className='qr-descr'>{data.Weight} <span>Kg's</span> </span>
          </div>
          <div className='user-data'>
            <h4 className='qr-side-heading'>Charges:</h4>
            <span  className='qr-descr'>{(83+data.Weight*2.123).toFixed(2)} <span>&#8377;</span> </span>
          </div>
        <div className='user-data'>
            <h4 className='qr-side-heading'>Shipment-date:</h4>
            <span  className='qr-descr'>{data.Date} </span>
          </div>
          <div className='user-data'>
            <h4 className='qr-side-heading'>Shipment-Time:</h4>
            <span  className='qr-descr'>{data.Time} </span>
          </div>
         
          <div className='user-data'>
            <h4 className='qr-side-heading'>Receiver location:</h4>
            <span  className='qr-descr'>{data.Shipment_To} </span>
          </div>
         <div className='user-data'>
           { data.shipment  && <h4 className='qr-side-heading'>Received Date:</h4> }
           {data.shipment &&  <span  className='qr-descr'>{data.Received_Date} </span> }
          </div>
          <div className='user-data'>
         {data.shipment &&  <h4 className='qr-side-heading'>Received Time:</h4> }
         {data.shipment &&  <span  className='qr-descr'>{data.Received_Time} </span> }
          </div>
          <div className='user-data'>
            <h4 className='qr-side-heading'>Status:</h4>
            <span>{(data.shipment) ? <span className='btn btn-success' >Delivered</span> : <span className='btn btn-secondary' >Pending</span>} </span>
          </div>
        </div>
      </div>}
      <br />
      <br />
    </div>
  )
}

export default Qrdetails