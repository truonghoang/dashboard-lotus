import React from "react";
import { connect } from "react-redux";

import { Select, Input, Radio, Button, Row ,Col} from "antd";
import * as actions from "../../redux/reducers/Report"
import "@/styles/Report.scss";
export const ReportForm = (props) => {
  const [reason, setReason] = React.useState("Tin Rác");
  const [dataReport,setDataReport] = React.useState({
    reporter_id: 0,
    report_id:0,
    reason:"",
    message:""
  })
  const [reporter,setReporter] = React.useState("")
  const [reported,setReported] =React.useState("")
  const plainOptions = [
    "Tin Rác",
    "Bạo lực",
    "Lạm dụng trẻ em ",
    "Nội dung khiêu dâm",
    "Khác",
  ];
  const options = [];
  
  const handleChangeReporter = (value) => {
    setDataReport(preData=>({
      ...preData,
      reporter_id:value
    }))
    setReporter(value)
  };
  const handleChangeReport = (value) => {
    setDataReport(preData=>({
      ...preData,
      report_id:value
    }))
    setReported(value)
  };
  const onChangeReason = ({ target: { value } }) => {
   
    setReason(value);
    setDataReport(preData=>({
      ...preData,
      reason:value
    }))
  };
  const submitReport = ()=>{
    // eslint-disable-next-line react/prop-types
    props.reportUser(dataReport)
  }
  let timeout;
 
  return (
    <div className="form-report">
      <div className="container-left">
        <div className="block-reporter">
          <span className="title">Reporter:</span>
          <Select
            className="select-reporter"
            placeholder="User Report"
            onChange={handleChangeReporter}
            options={options}
          />

          <span className="title">Reported : </span>

          <Select

            className="select-reporter"
            placeholder="User Reported"
            onChange={handleChangeReport}
            options={options}
          />
        </div>
        <div className="block-reported">
          <span className="title">Reason Report:</span>
          <Radio.Group
            className="radio-sel"
            options={plainOptions}
            onChange={onChangeReason}
            value={reason}
          />
        {
          reason =="Khác" ?<>
          <span className="title">Message for other reason :</span>
          <Input.TextArea rows={7} className="message"  onChange={(e)=>{
             clearTimeout(timeout)
            timeout =setTimeout(()=>{
              setDataReport(preData=>({
                ...preData,
                message: e.target.value
              }))
            },500)
          }}/>
          </>:""
        }
        </div>
      </div>
      <div className='form-right'>
    
      <Row className="row"> Thông tin báo cáo</Row>
      <Row className="row"><Col span={8}>Người báo cáo:</Col><Col span={12}>{reporter}</Col></Row>
      <Row className="row"><Col span={8}>Người bị tố cáo:</Col><Col span={12}>{reported}</Col></Row>

      <Row className="row"><Col span={8}>Lí do :</Col><Col span={10}>{dataReport.reason}</Col></Row>

      <Row className="row"><Col span={8}>Thông tin bổ sung:</Col></Row>
      <Row className="row"><Col span={24} style={{width:"100%",margin:"10px",background:"#fafafa"}}>{dataReport.message}</Col></Row>



        <Button onClick={submitReport} >Submit Report</Button>
      </div>
    </div>
  );
};



const mapDispatchToProps = (dispatch) => {
  return {
    reportUser :(data)=>{
      dispatch(actions.reportRequest(data))
    }
  };
};

export default connect(null, mapDispatchToProps)(ReportForm);
