import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import TableCommon from "../common/Table";
import { Col, Row, Switch,Drawer ,List} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import * as actions from "../../redux/reducers/User";
import Filter from "./Filter";
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
  React.useEffect(() => {
    props.listUserBanned({ page: 1, limit: 10, orderBy: "DESC", ban: 1 });
  }, []);
  const handleOpenHistory = ()=>{
    setOpenHistory(!openHistory)
  }
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
    props.searchReport({ page: 1, limit: 20, keySearch: value });
  };
  const reloadData = () => {
    props.listUserBanned({ page: 1, limit: 10, orderBy: "DESC" });
  };
  const onFilter = (value) => {
    props.listUserBanned({ ...value, page: 1, limit: 10, ban: 1 });
  };
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
      <Drawer width={"40vw"} title="History banned user" onClose={handleOpenHistory} open={openHistory}>
      
     <List
      itemLayout="horizontal"
      dataSource={[]}
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
    getHistory:(data)=>{
      dispatch(actions.historyUserBannedRequest(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
