// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import Header from './components/header'
// import Footer from './components/footer'
// //import App from './App';
// import Home from './pages/home'; 
// import About from './pages/about'; 
// import Services from './pages/services';
// import Login from './pages/login';

// import Contact from './pages/contact';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";



// const router = createBrowserRouter([
//    {
//     path: "/header",
//     element:<Header/>,
//     errorElement:<h1>SORRY!! there is an error</h1>
//   },
//   {
//     path: "/login",
//     element:<Login/>,
//     errorElement:<h1>SORRY!! there is an error</h1>
//   },
//   {
//     path: "/home",
//     element:<Home/>,
//   },
//   {
//     path: "/about",
//     element:<About/>,
//   },
//   {
//     path: "services",
//     element:<Services/>,
//     // children: [
//     //   {
//     //     path: "/services",
//     //     element: <ServicesList />,
//     //   },
      
//     // ],
    
//   },
//   {
//     path: "/",
//     element:<Home/>,
//   },
//   {
//     path: "/contact",
//     element:<Contact/>,
//   },
//   {
//     path: "/footer",
//     element:<Footer/>,
//   },
//   // {
//   //   path: "/",
//   //   element:<App/>,
//   // },
// ]);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//    <RouterProvider router={router} />
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

