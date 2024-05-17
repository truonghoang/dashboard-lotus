import React from "react";
import { connect } from "react-redux";
import TableCommon from "../common/Table";
import { Button } from "antd";
import {EyeOutlined} from "@ant-design/icons"
import * as actions from "../../redux/reducers/Report"
export const ReportTable = (props) => {
  const columns = [
    {
      title: "Index",
      width: 100,
      dataIndex: "index",
      align:"center",
      key: "index",
    },
    {
      title: "Name Reported",
      dataIndex: "name_reporter",
      align:"center",
      key: "name_reporter",
    },
    {
      title: "Reported",
      dataIndex: "reported_name",
      align:"center",
      key: "reported_name",
    },
    {
      title: "Phone Reporter",
      dataIndex: "phone_reporter",
      align:"center",
      key: "phone_reporter",
    },
    {
      title: "Reported Phone",
      dataIndex: "phone_reported",
      align:"center",
      key: "phone_reported",
    },
    {
      title: "Action",
      align:"center",
      dataIndex: "action",
      key: "action",
      render: (record) => {
        return<>
            <EyeOutlined style={{color:"#2196f3"}} />
        </>
      },
    },
  ];

  React.useEffect(()=>{
    props.getReport({page:1,limit:20})
  },[])

  const dataResource = React.useMemo(()=>{
   return props.store.data.map((item,index)=>{
        return {
            ...item,
            index: (props.store.page - 1) * props.store.limit + index + 1
        }
    })
  },[props.store.data,props.store.limit,props.store.page])
  return (
    <div>
      <TableCommon columns={columns} pageSize={props.store.limit} totalPage={props.store.totalPage} data={dataResource} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    store : state.ReportReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReport: (data)=>{
        dispatch(actions.listReportRequest(data))
    },
    getDetail: (data)=>{
        dispatch(actions.detailReportRequest(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportTable);
