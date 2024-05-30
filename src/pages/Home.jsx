import React from 'react'
import Table from "@/components/module/ReportTable"
import DetailForm from '../components/common/DetailForm'
import "@/styles/Home.scss"
function Home() {

  return (
    <div className='wrap-home'>
    <DetailForm/>
    <Table/>
    </div>
  )
}

export default Home