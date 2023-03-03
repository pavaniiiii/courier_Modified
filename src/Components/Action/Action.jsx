import React, { useEffect, useState } from 'react'
import "./action.css"
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Action() {
  const [data, setData] = useState(null)

  useEffect(()=>{
       fetch("https://courier-orders-default-rtdb.firebaseio.com/couriers.json")
       .then(res=>{
        return res.json()})
       .then(res=>{
        setData(res)
        console.log(res)
  })

       .catch(err=>console.log(err))
  },[])
   
 
  return (
    <div className='action'>
      <img src="https://wallup.net/wp-content/uploads/2019/09/729853-sea-waves-rocks-beach-sunrise.jpg" width={"100%"} height="500px" alt="" className='tracking-img' />
      <h2 className='tracking-main'>Courier details& Receive actions  </h2>
      <table className="table table-bordered table-main" width={"500px"} >
      
        <thead className="bg-dark text-white table-header">
          <tr className='table-header-row'>
         
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
                  { data && 
                   Object.keys(data).map((id)=>
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
                     <td>{(data[id].shipment) ? <span className='btn btn-success'>Delivered</span> : <span className='btn btn-secondary' >Pending</span> } </td>
                     <td className='edit' > <Link to={`/action/${id}`} > <VisibilityIcon color="primary" fontSize='large' /></Link> </td>
                  </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Action