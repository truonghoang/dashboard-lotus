import React, { useState } from "react";
import { CopyOutlined,ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row, message, Drawer, Divider,Radio } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../redux/reducers/Report";
import Cookies from "js-cookie";
import TableReporter from "../module/ReporterTable"
import "@/styles/Detail.scss";
// eslint-disable-next-line react/prop-types
export function DetailForm(props) {
  const { title = "DETAIL", item = {}, open, onClose } = props;

  const navigator = useNavigate();
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const DrawerLevel2 = () => {
    return (
      <Drawer
        className="drawer2"
        title="Các Báo Cáo"
        width={"70vw"}
        closable={false}
        onClose={() => {
          setChildrenDrawer(false), props.closeDetailLinkAndAccount();
        }}
        open={childrenDrawer}
        placement="left"
      >
      <TableReporter/>
      </Drawer>
    );
  };
  const options = [
    {
      label: "Spam",
      value: 0,
    },
    {
      label: "Tin rác",
      value: 1,
    },
  ];
  const handleSelect = (value) => {
    console.log(value);
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
        <Radio value={1}>Đánh dấu đã đọc tin</Radio>
        </Row>
        <Divider />
        <Row className="row">
          <Col span={12} >
            <Row style={{color:"#2196f3",marginBottom:"20px"}}>Chấp thuận vi phạm báo cáo :</Row>
            <Row style={{color:"#f44336"}}>Từ chối vi phạm báo cáo:</Row>
          </Col>
          <Col span={12}>
          <Radio.Group style={{display:"flex",flexDirection:"column"}}>
          <Radio value={1} style={{marginBottom:"20px"}}>Đồng ý</Radio>
          <Radio value={2}>Từ chối</Radio>
          </Radio.Group> </Col>
        </Row>
        <Divider />
        <Row style={{color:"#03a9f4",cursor:"pointer"}} onClick={()=>{setChildrenDrawer(true)}}><Col span={15}>Xem thêm  báo cáo khác của người báo cáo</Col><Col span={4}><ArrowRightOutlined /></Col></Row>
      {DrawerLevel2()}
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    reportState: state.ReportReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailForm);
