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
   <Header />
      </div>
      <Routes>
        <Route    path='/'  exact element={<><Content />    </> } />  
        <Route  path='/tracking' exact   element={<><Tracking  />   </>} />  
        <Route  path='/action' exact element={<><Action />   </>} />  
        <Route  path='/action/:id' exact element={<><Submit  />   </> } />  
        <Route  path='/login' exact element={<><Login />  </> } /> 
        <Route  path='/register' exact element={<><Register />   </>} />  
        <Route  path='/logout' exact element={<><Logout/>  </>} />      
        <Route  path='/forgot' exact element={<><ForgotPaswd />  </>} />
        {/* <Route  path='/qr/:id' exact  element={<Qrdetails />} /> */}
      </Routes>
      </BrowserRouter>
  );
}

export default App;





