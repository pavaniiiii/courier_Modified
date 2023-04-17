import React from 'react'
import QRCode from "react-qr-code";

function Qrcode({value}) {
  return (
    <div>
       {
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 124, width: "100%" }}>
        <QRCode
         size={256}
        style={{ height: "auto", width: "60px", cursor:"pointer" }}
        value={value}
        viewBox={`0 0 256 256`}
        />
    </div>
       }
    </div>
  )
}



export default Qrcode