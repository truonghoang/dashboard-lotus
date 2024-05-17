import React from "react";
import Router from "./Route";
import Header from "./components/header";
import SideBar from "./components/sidebar";
import {useLocation} from "react-router-dom"
import "./App.css"
export default function App() {
  const [cond, setCond] = React.useState(
   
      window.location.pathname === '/login' 
     
     
  );

  const location = useLocation();
  React.useEffect(() => {
    const cond = location.pathname === '/login' 
    cond ? setCond(true) : setCond(false);
  }, [location]);
  return (
    <div className="container-root">
     {!cond ? <SideBar />:""} 
      <div className="right-container">
      {!cond ? <Header />:""} 
       
        <Router />
      </div>
    </div>
  );
}
