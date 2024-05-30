import React, { useState } from "react";
import { CopyOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Col, Row, message, Drawer, Select, Divider, Button } from "antd";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../redux/reducers/Report";
import * as actionsUser from "../../redux/reducers/User";
import {reason_select} from "../../utilizings/array"
import Cookies from "js-cookie";
import "@/styles/Detail.scss";
// eslint-disable-next-line react/prop-types
export function DetailForm(props) {
  const { title = "DETAIL", item = {}, open, onClose } = props;
  const [dataBan, setDataBan] = React.useState({
    peer_id: item.peer_id || 0,
    reason: -1,
    phone: item.phone ||"",
    ban: 1,
  });
  const navigator = useNavigate();
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const DrawerLevel2 = () => {
    return (
      <Drawer
        className="drawer2"
        title="Chi Tiết"
        width={520}
        closable={false}
        onClose={() => {
          setChildrenDrawer(false), props.closeDetailLinkAndAccount();
        }}
        open={childrenDrawer}
        placement="left"
      >
        <h3 className="title">Bí Danh</h3>

        {props.reportState.detailLink.map((item, index) => {
          return (
            <Row className="row link" key={index}>
              <Col span={8}>Bí danh {index + 1} :</Col>{" "}
              <Col span={12}>@{item.link}</Col>
            </Row>
          );
        })}

        <h3 className="title">Tài khoản chung số điện thoại</h3>

        {props.reportState.detailAccount.map((item, index) => {
          return (
            <div className="row account" key={index}>
              <Row>
                <Col span={8}>Tên:</Col>
                <Col span={12}>{`${item.first_name} ${item.last_name}`}</Col>
              </Row>
              <Row>
                <Col span={8}>Số điện thoại:</Col>
                <Col span={12}>{item.phone}</Col>
              </Row>
              <Row>
                <Col span={8}>Số lần bị báo cáo:</Col>
                <Col span={12}>{item.totalReport}</Col>
              </Row>
            </div>
          );
        })}
      </Drawer>
    );
  };
 
  const handleSelect = (value) => {
    
    setDataBan(preData=>({...preData,reason:value}))
  };
 
 
  return (
    <div>
      {contextHolder}
      <Drawer
        className="drawer1"
        title="Thông tin người bị báo cáo"
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
        placement="left"
      >
        <Row className="row">
          <Col span={12}>Tên đầy đủ người bị báo cáo:</Col>
          <Col span={8}>{item.name}</Col>
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
          <Col span={12}>Số bí danh của người bị báo cáo:</Col>
          <Col span={8}>{item.total_Link}</Col>
        </Row>
        <Row className="row">
          <Col span={12}>Số tài khoản cùng số điện thoại:</Col>
          <Col span={8}>{item.total_Account}</Col>
        </Row>
        <Row>
          <Col
            className="detail"
            onClick={() => {
              props.detailLink({ id: item.peer_id }),
                props.detailAccount({ phone: item.phone }),
                setChildrenDrawer(true);
            }}
          >
            {" "}
            xem chi tiết bí danh và tài khoản cùng số điện thoại{" "}
            <ArrowLeftOutlined style={{ marginLeft: 10 }} />
          </Col>
        </Row>
        <Row className="row">
          <Col
            className="detail"
            onClick={() => {
              onClose();
              navigator(`/report/user/${item.peer_id}`);
            }}
          >
            {" "}
            xem chi tiết danh sách thông tin báo cáo với tài khoản{" "}
            <ArrowLeftOutlined style={{ marginLeft: 10 }} />
          </Col>
        </Row>
        {DrawerLevel2()}
        <Divider />
        <Row>
          <h3 className="title">Chọn lí do cấm:</h3>
          <Select
            style={{
              width: "90%",
            }}
            placeholder="Chọn lí do ban"
            onChange={handleSelect}
            options={reason_select}
          />
        </Row>
        <div className="note">
          Warning: Lệnh ban được thực thi bởi{" "}
          {Cookies.get("account") || "admin hệ thống"}, các tài khoản có cùng số
          điện thoại sẽ bị cấm , thông tin sẽ được xác thực bởi hệ thống
        </div>
        <Button
          type="primary"
          onClick={(e) => {
            if (dataBan.reason < 0) {
              messageApi.open({
                type: "error",
                content: "chọn lí do ban",
              });
              e.preventDefault();
            } else if(dataBan.id ==0){
              messageApi.open({
                type: "error",
                content: "user chưa xác định",
              });
              e.preventDefault();
            }else  {
              props.banUser(dataBan);
            }
          }}
        >
          Thực hiện Ban
        </Button>
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
  return {
    detailLink: (data) => {
      dispatch(actions.detailLinkReportedRequest(data));
    },
    detailAccount: (data) => {
      dispatch(actions.detailAccountReportedRequest(data));
    },
    closeDetailLinkAndAccount: () => {
      dispatch(actions.closeDetailLinkAndLink());
    },
    banUser: (data) => {
      dispatch(actionsUser.unBanUserRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailForm);
