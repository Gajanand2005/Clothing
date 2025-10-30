import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import { createContext, useState } from 'react';
import Login from './Pages/Login';
import SignUp from './Pages/Signup';

export const MyContext = createContext();

function App() {

  const[isSidebarOpen,setisSidebarOpen] = useState(true);
  const[isLogin, setisLogin] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element:
        (
          <>
            <section className="main">
              <Header />
              <div className="contentMain flex">
                <div className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? 'w-[23%] transition-all' : 'w-[0%] opacity-0 transition-all'}`}>
                  <Sidebar />
                </div>
                <div className={`contentRight py-4 px-5 ${isSidebarOpen ? 'w-[77%] transition-all' : 'w-[100%] transition-all'}`}>
                  <Dashboard />
                </div>
              </div>
            </section>
          </>
        ),
    },

    {
      path: "/login",
      exact: true,
      element:
        (
          <>
            <section className="main">
                  <Login />
            </section>
          </>
        ),
    },

    {
      path: "/signup",
      exact: true,
      element:
        (
          <>
            <section className="main">
                  <SignUp />
            </section>
          </>
        ),
    },
  ]);

  const values = {isSidebarOpen,setisSidebarOpen,isLogin,setisLogin};

  return (
    <> 
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />
    </MyContext.Provider>
    </>
  )
}

export default App;

