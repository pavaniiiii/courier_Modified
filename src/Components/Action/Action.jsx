import React, { useEffect, useState } from 'react'
import "./action.css"
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Action() {
  const [data, setData] = useState(null)

  useEffect(()=>{
       fetch("http://localhost:5000/couriers")
       .then(res=>{
        return res.json()})
       .then(res=>setData(res))

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
              { data &&  data.map((item)=>
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
                     <td>{(item.shipment) ? <span className='btn btn-success'>Delivered</span> : <span className='btn btn-secondary' >Pending</span> } </td>
                     <td className='edit' > <Link to={`/action/${item.id}`} > <VisibilityIcon color="primary" fontSize='large' /></Link> </td>
                  </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Action