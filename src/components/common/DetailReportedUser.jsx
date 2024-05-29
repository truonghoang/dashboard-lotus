import React, { useState } from "react";
import { CopyOutlined,ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row, message, Drawer, Divider,Radio,List } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../redux/reducers/Report";
import *as otherActions from "../../redux/reducers/Reporter"
import Cookies from "js-cookie";
import Filter from "../module/Filter"
import "@/styles/Detail.scss";
// eslint-disable-next-line react/prop-types
export function DetailForm(props) {
  const { title = "DETAIL", item = {}, open, onClose } = props;

  const navigator = useNavigate();
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  
  const DrawerLevel2 = () => {
   
  const reloadData = ()=>{
     props.listOtherReportOfReporter({id:item.user_id,orderBy:"DESC"})
    }
  const onSelect =(value)=>{ 
    props.filterOtherReportOfReporter({reason:value.reason,id:item.user_id})
  }
 const onFilter = (value)=>{
  props.listOtherReportOfReporter({...value,id:item.user_id})
}
const [otherReport,setOtherReport] =React.useState([])
 
 React.useEffect(()=>{
  let listDataOtherReport = props.dataOtherReport.map((item,index)=>{
    return{
      ...item
    }
   })
   setOtherReport(listDataOtherReport)
 },[props.dataOtherReport])
    return (
      <Drawer
        className="drawer2"
        title="Các Báo Cáo Khác Từ Người Báo Cáo"
        width={"40vw"}
        closable={false}
        onClose={() => {
          setChildrenDrawer(false), props.closeDetailLinkAndAccount();
        }}
        open={childrenDrawer}
        placement="left"
      >
      <Filter reloadData={reloadData} isSearch={false} isNew={true} isReason={true} onSelect ={onSelect} onFilterTime={onFilter}  />
     <Divider/>
     {
      otherReport ?<List
      itemLayout="horizontal"
      dataSource={otherReport}
      renderItem={(item) => (
        <List.Item
        style={{width:"95%",margin:'auto'}}
          // actions={[<a key="list-loadmore-edit">edit</a>]}
        >
            <List.Item.Meta style={{width:"90%"}}
              title={<span style={{width:400,marginBottom:10}} >Người bị tố cáo:  {`${item.first_name} ${item.last_name}`}</span>}
              description={<div style={{width:'100%',display:'flex',flexDirection:'column'}}>
              <h4>{`Thời gian: ${item.created_at}`}</h4>
              <h4>{`Số điện thoại: ${item.phone}`}</h4>
                <h4 style={{width:'100%',marginBottom:10}}>{ item.reason_label?`Lí do báo cáo: ${item.reason_label}`: "Lí do báo cáo : chưa có"}</h4>
                <p style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{item.content ?`Nội dung báo cáo: ${item.content}`:"Nội dung báo cáo: Trống"}</p> 

              </div>}
            />
        </List.Item>
      )}
    />:""
     } 
      </Drawer>
    );
  };

  return (
    <div>
      {contextHolder}
      <Drawer
        className="drawer1"
        title="Thông tin về báo cáo"
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
        placement="left"
      >
        <Row className="row">
          <Col span={12}>Tên đầy đủ người báo cáo:</Col>
          <Col span={8}>{`${item.first_name} ${item.last_name}`}</Col>
        </Row>
        <Row className="row">
          <Col span={12}>Số điện thoại:</Col>
          <Col span={8}>{item.phone}</Col>
          <Col span={4}>
            {" "}
            <CopyOutlined
              className="copy-icon"
              onClick={() => {
                navigator.clipboard.writeText(item.phone).then(() => {
                  messageApi.open({
                    type: "success",
                    content: "copy successfully",
                  });
                });
              }}
            />
          </Col>
        </Row>
        <Row className="row">
          <Col span={12}>Lí do báo cáo:</Col>
          <Col span={8}>{item.reason_label}</Col>
        </Row>
        <Row className="row">
          <Col span={12}>Nội dung báo cáo:</Col>
          <Col span={12}>{item.content}</Col>
        </Row>
        <Row className="row">
          <Col span={12}>Thời gian tạo:</Col>
          <Col span={12}>{item.created_at}</Col>
        </Row>
        <Divider />
        <Row>
        <Col span={12} style={{color:"#ff9800"}}>Xác nhận đã đọc tin báo cáo :</Col>
        <Radio value={1} onChange={(e)=>{
         props.tickNewsReport({id:item.id,process:e.target.value})
        }}>Đánh dấu đã đọc tin</Radio>
        </Row>
        <Divider />
        <Row className="row">
          <Col span={12} >
            <Row style={{color:"#2196f3",marginBottom:"20px"}}>Chấp thuận vi phạm báo cáo :</Row>
            <Row style={{color:"#f44336"}}>Từ chối vi phạm báo cáo:</Row>
          </Col>
          <Col span={12}>
          <Radio.Group style={{display:"flex",flexDirection:"column"}} onChange={(e)=>{
            props.accessOrDeniedReport({id:item.id,process:e.target.value})
          }}>
          <Radio value={1} style={{marginBottom:"20px"}}>Đồng ý</Radio>
          <Radio value={2}>Từ chối</Radio>
          </Radio.Group> </Col>
        </Row>
        <Divider />
        <Row style={{color:"#03a9f4",cursor:"pointer"}} onClick={()=>{props.listOtherReportOfReporter({id:item.user_id,orderBy:"ASC"}),setChildrenDrawer(true)}}><Col span={15}>Xem thêm  báo cáo khác của người báo cáo</Col><Col span={4}><ArrowRightOutlined /></Col></Row>
      {DrawerLevel2()}
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    reportState: state.ReportReducer,
    dataOtherReport: state.ReporterReducer.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tickNewsReport:(data)=>{
      dispatch(actions.tickNewsReportRequest(data))
    },
    accessOrDeniedReport: (data)=>{
      dispatch(actions.accessReportRequest(data))
    }, filterByReason : (data)=>{
      dispatch(actions.filterByReasonRequest(data))
    },
    listOtherReportOfReporter:(data)=>{
      dispatch(otherActions.listReportOfReporterRequest(data))
    },
    filterOtherReportOfReporter:(data)=>{
      dispatch(otherActions.filterByReasonRequest(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailForm);
