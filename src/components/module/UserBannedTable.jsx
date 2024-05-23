import React from "react";
import { connect } from "react-redux";
import {useLocation} from "react-router-dom"
import TableCommon from "../common/Table";
import { Col, Row, Switch } from "antd";
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
      render:(_,record,index)=>{
        return  <Switch checkedChildren="Ban" unCheckedChildren="UnBan" defaultValue={record.banned} checked={record.banned==true?true:false} />
      }
    },
    {
      title: "Chức Năng",
      align: "center",
      dataIndex: "action",
      key: "action",
      render: (_, record, index) => {
        return (
          <Row key={index}>
            <Col span={5} offset={9}>
              <EyeOutlined
                onClick={() => {
                  props.getDetail({ id: record.id });
                  setOpen(true);
                }}
                style={{ color: "#2196f3", cursor: "pointer",fontSize:20 }}
              />
            </Col>
          </Row>
        );
      },
    },
  ];
  const [open, setOpen] = React.useState(false)
  

 
 
  React.useEffect(() => {
    
    props.listUserBanned({ page: 1, limit: 10,orderBy:"ASC",ban:1 });
  }, []);

  const dataResource = React.useMemo(() => {
    return props.store.data.map((item, index) => {
        let banned
     
      if (item.reason==0){
        banned=false
      }else {
        banned=true
      }
      return {
        ...item,
        fullName: `${item.first_name}  ${item.last_name}`,
        banned,
        index:  index + 1,
      };
    });
  }, [props.store.data, props.store.limit, props.store.page]);
  return (
    <div>
    <Filter isNew={true} />
      <TableCommon
        columns={columns}
        pageSize={props.store.limit}
        totalPage={props.store.totalPage}
        data={dataResource}
        onChangePage={(page,limit)=>{ props.reportUser({page,limit})}}
      />
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
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
