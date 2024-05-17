import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {LogoutOutlined} from "@ant-design/icons"
import "@/styles/Header.scss"
import { Button } from 'antd'
import jsCookie from "js-cookie"
import {useNavigate} from "react-router-dom"
 const Header = (props) => {
    const user = useSelector(state=>state.UserReducer)
    const navigate = useNavigate()
  return (
    <div className='wrap-header'>
      <Button className='btn-logout' onClick={()=>{ jsCookie.remove("user");
      navigate("/login")}} >Logout <LogoutOutlined /></Button>
    </div>
  )
}


export default Header;

