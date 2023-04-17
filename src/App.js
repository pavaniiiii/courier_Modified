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
        <Route    path='/'  exact element={<> <Header /><Content />    </> } />  
        <Route  path='/tracking' exact   element={<><Header /><Tracking  />   </>} />  
        <Route  path='/action' exact element={<><Header /><Action />   </>} />  
        <Route  path='/action/:id' exact element={<><Header /><Submit  />   </> } />  
        <Route  path='/login' exact element={<><Header /><Login />  </> } /> 
        <Route  path='/register' exact element={<><Header /><Register />   </>} />  
        <Route  path='/logout' exact element={<><Header /><Logout/>  </>} />      
        <Route  path='/forgot' exact element={<><Header /><ForgotPaswd />  </>} />
        <Route  path='/qr/:id' exact  element={<Qrdetails />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;




// "homepage": "http://pavaniiiii.github.io/courier_mini",
