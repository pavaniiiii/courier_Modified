import Header from './Header/Header';
import Content from './Components/Content/Content';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tracking from './Components/Tracking/Tracking';
import Action from './Components/Action/Action';
import Submit from './Components/Submit/Submit';
import firebaseDB from './firebase'
import Login from './UserCredentials/Login/Login';
import Register from './UserCredentials/Register/Register';
import Logout from './UserCredentials/Logout/Logout';
import Qrdetails from './Components/Qrdetails/Qrdetails';
import ForgotPaswd from './UserCredentials/ForgotPaswd/ForgotPaswd';



function App() {
  return (
    <BrowserRouter>
      <div className='main'>
   
      </div>
      <Routes>
        <Route  path='/'  element={<><Content />    <Header />  </> } />  
        <Route  path='/tracking' element={<><Tracking  />   <Header /> </>} />  
        <Route  path='/action' element={<><Action />    <Header /></>} />  
        <Route  path='/action/:id' element={<><Submit  />    <Header /></> } />  
        <Route  path='/login' element={<><Login />   <Header /> </> } /> 
        <Route  path='/register' element={<><Register />    <Header /> </>} />  
        <Route  path='/logout' element={<><Logout/>    <Header /> </>} />      
        <Route  path='/forgot'  element={<><ForgotPaswd />   <Header /> </>} />
        <Route  path='/qr/:id' exact  element={<Qrdetails />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;





