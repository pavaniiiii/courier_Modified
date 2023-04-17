import React, { useEffect, useState } from 'react'
import "./action.css"
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Qrcode from '../Qrcode/Qrcode';
import QRCode from 'react-qr-code';

function Action() {
  const [data, setData] = useState(null)
  const [window, setWindow] = useState(false)
  const[id,setId]=useState("")
  useEffect(() => {
    fetch("https://courier-orders-1bdb1-default-rtdb.firebaseio.com/couriers.json")
  

      .then(res => {
        return res.json()
      })
      .then(res => {
        setData(res)
        console.log(res)
      })

      .catch(err => console.log(err))
  }, [])

  const handleClick = (id) => {
    setWindow(!window)
    setId(id)
  }


  return (
    <div className='action'>
      <img src="https://wallup.net/wp-content/uploads/2019/09/729853-sea-waves-rocks-beach-sunrise.jpg" width={"100%"} height="500px" alt="" className='tracking-img' />
      <h2 className='tracking-main'>All Courier details & Actions  </h2>
      <table className="table table-bordered table-main" width={"500px"} >

        <thead className="bg-dark text-white table-header">
          <tr className='table-header-row'>
            <td>QR-code</td>
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
            <td>View More</td>

          </tr>
        </thead>
        <tbody>
          {/* { data &&  data.map((data[id])=> */}
          {data &&
            Object.keys(data).map((id) =>
              <tr className='border' key={id} >
                <td onClick={()=> handleClick(id)}  >
              
                  {<Qrcode value={"https://courier-orders-1bdb1.web.app/qr/" + id} />}
                
                </td>
                <td>{data[id].Tracking_Id} </td>                
                <td>{data[id].Full_Name} </td>
                <td>{data[id].Email} </td>
                <td>{data[id].Phone_No} </td>
                <td>{data[id].Shipment_From} </td>
                <td>{data[id].Shipment_To} </td>
                <td>{data[id].Date} </td>
                <td>{(data[id].Time)} </td>
                <td>{(data[id].Received_Date) ? (data[id].Received_Date) : "-"}</td>
                <td>{(data[id].Received_Time) ? (data[id].Received_Time) : "-"}</td>
                <td>{(data[id].shipment) ? <span className='btn btn-success'>Delivered</span> : <span className='btn btn-secondary' >Pending</span>} </td>
                <td className='edit' > <Link to={`/action/${id}`} > <VisibilityIcon color="primary" fontSize='large' /></Link> </td>
              </tr>)}
        </tbody>
      </table>
      { window &&
        <div className="model">
          <div className="overlay">
            <div className="model-content">
              <h3 className='qr-code-heading'>QR Code Scanner</h3>
              <div style={{ height: "auto", margin: "0 auto", maxWidth: 104, width: "100%" }}>
               <QRCode
                  size={256}
                  style={{ height: "auto", width: "210px" }}
                  value={"https://courier-orders-1bdb1.web.app/qr/"+ id}
                  viewBox={`0 0 256 256`}
                /> 
                <button className='close-model' onClick={handleClick}>&#10006;</button>
                </div>

            </div>
          </div>
        </div>
      }
      
    </div>
  )
}

export default Action