import { BrowserRouter , Route, Routes} from 'react-router-dom';
import React from 'react';
import './App.css';

import Home from './components/pages/home';
import About from './components/pages/about';
import Services from './components/pages/services';
import Contact from './components/pages/contact';
import Login from './components/pages/login';
import Dashboard from './components/Admin/dashboard';
import Worker from './components/projectpages/worker';
import AddWorker from './components/projectpages/AddWorker';
// import EditCar from './components/projectpages/EditCar';
import EditWorker from './components/projectpages/EditWorker';
// import CarDetails from './components/projectpages/CarDetail';
// import AddCar from './components/projectpages/AddCar';
//import Profile from './components/projectpages/Profile';
import AdminProfile from './components/Admin/AdminProfile';
import WorkerProfile from './components/User/workerProfile';
import WorkerDashboard from './components/User/WorkerDashboard';
import WorkerAddCar from './components/User/workerAddCar';
// import CarList from './components/projectpages/Carlist'
import AdminCarList from './components/Admin/AdminCarList';
import AdminAddCar from './components/Admin/AdminAddCar';
import WokerAddService from './components/User/workerAddService';
import AdminAddService from './components/Admin/AdminAddService';
import WorkerEditCar from './components/User/WorkerEditCar';
import WorkerCarDetails from './components/User/WorkerCarDetails';
import AdminEditCar from './components/Admin/AdminEditCar';
import AdminCarDetails from './components/Admin/AdminCarDetails';
import Client from './components/projectpages/Client';
import PDF from './components/projectpages/PDF';
function App() {

  return (
    <BrowserRouter>
    <div className='container-App '>
       <Routes>
       <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/services' element={<Services/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/worker' element={<Worker/>}/>
      <Route path='/addWorker' element={<AddWorker/>}/>
      <Route path='/editWorker/:id' element={<EditWorker/>}/>
      <Route  path='/carList' element={<AdminCarList />}/>
      {/* <Route  path='/worker/carList' element={<CarList />}/> */}
      <Route  path='/cars/:id' element={<AdminCarDetails />}/>
      <Route  path='/worker/cars/:id' element={<WorkerCarDetails />}/>
      <Route  path='/AddCar' element={<AdminAddCar/>}/>
      <Route  path='/worker/AddCar' element={<WorkerAddCar/>}/>
      <Route  path='/editCar/:id' element={<AdminEditCar />}/>
      <Route  path='/worker/editCar/:id' element={<WorkerEditCar />}/>
      <Route  path='/car/:id/addservice' element={<AdminAddService />}/>
      <Route  path='/worker/car/:id/addservice' element={<WokerAddService />}/>
      <Route  path='/workerProfile' element={<WorkerProfile />}/>
      <Route  path='/adminProfile' element={<AdminProfile />}/>
      <Route  path='/workerDashboard' element={<WorkerDashboard />}/>
      <Route  path='/client' element={<Client />}/>
      <Route  path='/pdf/:id' element={<PDF />}/>



    </Routes>
    
    
  </div>
  </BrowserRouter>
  
    )}
export default App;
