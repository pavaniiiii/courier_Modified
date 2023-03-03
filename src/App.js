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



function App() {
  return (
    <BrowserRouter>
      <div className='main'>
           <Header />
      </div>
      <Routes>
        <Route  path='/' element={<Content   />} />  
        <Route  path='/tracking' element={<Tracking  />} />  
        <Route  path='/action' element={<Action   />} />  
        <Route  path='/action/:id' element={<Submit  />} />  
        <Route  path='/login' element={<Login />} /> 
        <Route  path='/register' element={<Register />} />  
        <Route  path='/logout' element={<Logout/>} />    
      </Routes>
      </BrowserRouter>
  );
}

export default App;
