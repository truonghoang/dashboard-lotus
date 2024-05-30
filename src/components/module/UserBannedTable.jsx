import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import TableCommon from "../common/Table";
import { Col, Row, Switch, Drawer, List, Modal, Select } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import * as actions from "../../redux/reducers/User";
import Filter from "./Filter";
import { label_reason, reason_select } from "../../utilizings/array";
export const UserTable = (props) => {
  const columns = [
    {
      title: "Thứ Tự",
      width: 100,
      dataIndex: "index",
      align: "center",
      key: "index",
    },
    {
      title: "Tên Người Bị Ban",
      dataIndex: "fullName",
      align: "center",
      key: "name_reporter",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      align: "center",
      key: "phone",
    },
    {
      title: "Trạng Thái",
      dataIndex: "banned",
      align: "center",
      key: "banned",
      render: (_, record, index) => {
        return (
          <Switch
            checkedChildren="Ban"
            unCheckedChildren="UnBan"
            defaultValue={record.banned}
            checked={record.banned == true ? true : false}
            onChange={(e) => {
              setBan(true);
              setDataBan((preData) => ({
                ...preData,
                peer_id: record.uid,
                phone: record.phone,
              }));
            }}
          />
        );
      },
    },
    {
      title: "Lịch Sử Ban/UnBan",
      align: "center",
      dataIndex: "action",
      key: "action",
      render: (_, record, index) => {
        return (
          <Row key={index}>
            <Col span={5} offset={9}>
              <EyeOutlined
                onClick={() => {
                  props.getHistory({ id: record.uid });
                  setOpenHistory(true);
                }}
                style={{ color: "#2196f3", cursor: "pointer", fontSize: 20 }}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  const [openHistory, setOpenHistory] = React.useState(false);
  const [dataHistory, setDataHistory] = React.useState([]);
  const [dataBan, setDataBan] = React.useState({
    peer_id: 0,
    reason: 0,
    ban: 0,
    phone: "",
  });
  const [ban, setBan] = React.useState(false);
  React.useEffect(() => {
    props.listUserBanned({ page: 1, limit: 10, orderBy: "DESC", ban: 1 });
  }, []);
  const handleOpenHistory = () => {
    setOpenHistory(!openHistory);
  };
  React.useEffect(() => {
    let listHistory = props.store.history.map((item, index) => {
      return {
        ...item,
        status: item.ban == 1 ? "ban" : "unban",
        reason_label: label_reason[index],
      };
    });
    setDataHistory(listHistory);
  }, [props.store.history]);
  const dataResource = React.useMemo(() => {
    return props.store.data.map((item, index) => {
      let banned;

      if (item.reason == 0) {
        banned = false;
      } else {
        banned = true;
      }
      return {
        ...item,
        fullName: `${item.first_name}  ${item.last_name}`,
        banned,
        index: index + 1,
      };
    });
  }, [props.store.data, props.store.limit, props.store.page]);

  const onSearch = (value) => {
    props.searchUserBaned({
      page: 1,
      limit: 50,
      keySearch: value,
      orderBy: "DESC",
    });
  };
  const reloadData = () => {
    props.listUserBanned({ page: 1, limit: 10, orderBy: "DESC" });
  };
  const onFilter = (value) => {
    props.listUserBanned({ ...value, page: 1, limit: 10, ban: 1 });
  };

  console.log(dataBan);
  return (
    <div>
      <Filter
        isNew={true}
        onSearch={onSearch}
        reloadData={reloadData}
        isSearch={true}
        isReason={false}
        onFilterTime={onFilter}
      />
      <TableCommon
        columns={columns}
        pageSize={props.store.limit}
        totalPage={props.store.totalPage}
        data={dataResource}
        onChangePage={(page, limit) => {
          props.reportUser({ page, limit });
        }}
      />
      <Modal
        title="Ân xá người dùng"
        open={ban}
        onOk={() => {
          props.unBanUser(dataBan);
          setBan(false);
        }}
        onCancel={() => {
          setDataBan({ peer_id: 0, reason: 0, phone: "", ban: 0 });
          setBan(false);
        }}
      >
        <Row>
          <Col span={5}>Lí do: </Col>
          <Col span={10}>
            <Select
              style={{ width: 300 }}
              placeholder="lí do"
              onChange={(value) => {
                setDataBan((preData) => ({
                  ...preData,
                  reason: value,
                }));
              }}
              options={reason_select}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 10, color: "#2196f3" }}>
          Các tài khoản cùng số điện thoại {dataBan.phone} sẽ được ân xá
        </Row>
      </Modal>
      <Drawer
        width={"30vw"}
        title="History banned user"
        onClose={handleOpenHistory}
        open={openHistory}
      >
        <List
          itemLayout="horizontal"
          dataSource={dataHistory}
          renderItem={(item) => (
            <List.Item
              style={{ width: "95%", margin: "auto" }}
              // actions={[<a key="list-loadmore-edit">edit</a>]}
            >
              <List.Item.Meta
                style={{ width: "90%" }}
                title={
                  <span style={{ width: 400, marginBottom: 10 }}>
                    Người bị tố cáo: {`${item.first_name} ${item.last_name}`}
                  </span>
                }
                description={
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h4>{`Người thực hiện ban: ${item.admin_ban}`}</h4>
                    <h4>{`Thời gian: ${item.created_at}`}</h4>
                    <h4>{`Số điện thoại: ${item.phone}`}</h4>
                    <h4>{`Trạng thái: ${item.status} `}</h4>
                    <h4 style={{ width: "100%", marginBottom: 10 }}>
                      {item.reason_label
                        ? `Lí do bị báo cáo: ${item.reason_label}`
                        : "Lí do bị báo cáo : chưa có"}
                    </h4>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    store: state.UserReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listUserBanned: (data) => {
      dispatch(actions.listUserBanRequest(data));
    },
    searchUserBaned: (data) => {
      dispatch(actions.searchUserBannedRequest(data));
    },
    getHistory: (data) => {
      dispatch(actions.historyUserBannedRequest(data));
    },
    unBanUser: (data) => {
      dispatch(actions.unBanUserRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
