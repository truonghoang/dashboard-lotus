import React from "react";
import { connect } from "react-redux";
import TableCommon from "../common/Table";
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
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
      render: (record) => {
        return (
          <>
           
            <EyeOutlined />
           
          </>
        );
      },
    },
  ];

  React.useEffect(() => {
    props.getUser({ page: 1, limit: 20 });
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
      <TableCommon
        columns={columns}
        pageSize={props.store.limit}
        totalPage={props.store.totalPage}
        data={dataResource}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
