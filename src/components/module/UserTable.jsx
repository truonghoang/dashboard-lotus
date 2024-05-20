import React from "react";
import { connect } from "react-redux";
import {useLocation} from "react-router-dom"
import TableCommon from "../common/Table";
import { Col, Row,Switch } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import DetailForm from "../common/DetailForm";
import * as actions from "../../redux/reducers/User";
export const UserTable = (props) => {
  const columns = [
    {
      title: "Index",
      width: 100,
      dataIndex: "index",
      align: "center",
      key: "index",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      key: "name_reporter",
      render: (_, record, index) => {
        return (
          <Row key={index}>
            <Col span={5} offset={9}>
            <Switch checkedChildren="Active" unCheckedChildren="Ban" defaultChecked onChange={(checked)=>{console.log(checked)}} />
            </Col>
          </Row>
        );
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      align: "center",
      key: "name_reporter",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      align: "center",
      key: "reported_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      key: "phone_reporter",
    },
    {
      title: "Action",
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
  const location = useLocation()
  const onShowDetail = () => {
    setOpen(!open)
  }
  const onClose = () => {
    setOpen(false)
    props.closeForm()
  }
  React.useEffect(() => {
    if (location.search){
     
      console.log( location.state)
      // props.getUser({})
    }
    props.getUser({ page: 1, limit: 10 });
  }, []);

  const dataResource = React.useMemo(() => {
    return props.store.data.map((item, index) => {
      return {
        ...item,
        fullName: `${item.firstName}  ${item.lastName}`,
        index: (props.store.page - 1) * props.store.limit + index + 1,
      };
    });
  }, [props.store.data, props.store.limit, props.store.page]);
  return (
    <div>
     <DetailForm open={open} onOpen={onShowDetail} onClose={onClose} item={props.store.detail} title="DETAIL USER INFORMATION" />
      <TableCommon
        columns={columns}
        pageSize={props.store.limit}
        totalPage={props.store.totalPage}
        data={dataResource}
        onChangePage={(page,limit)=>{ props.getUser({page,limit})}}
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
    getUser: (data) => {
      dispatch(actions.listUserRequest(data));
    },
    getDetail:(data)=>{
      dispatch(actions.detailUserRequest(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
