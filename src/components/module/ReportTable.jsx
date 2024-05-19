import React from "react";
import { connect } from "react-redux";
import TableCommon from "../common/Table";
import { Row, Col, Popconfirm } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons"
import DetailForm from "../common/DetailForm";
import * as actions from "../../redux/reducers/Report"
export const ReportTable = (props) => {
  const [open, setOpen] = React.useState(false)
  const [detail, setDetail] = React.useState({})
  
  const columns = [
    {
      title: "Index",
      width: 100,
      dataIndex: "index",
      align: "center",
      key: "index",
    },
    {
      title: "Name Reported",
      dataIndex: "name_reporter",
      align: "center",
      key: "name_reporter",
    },
    {
      title: "Reported",
      dataIndex: "reported_name",
      align: "center",
      key: "reported_name",
    },
    {
      title: "Phone Reporter",
      dataIndex: "phone_reporter",
      align: "center",
      key: "phone_reporter",
    },
    {
      title: "Reported Phone",
      dataIndex: "phone_reported",
      align: "center",
      key: "phone_reported",
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "action",
      key: "action",
      render: (_, record, index) => {
        return <Row key={index}><Col span={5} offset={7}><EyeOutlined onClick={() => {

          props.getDetail({ id: record.id })
          setOpen(true)
        }} style={{ color: "#2196f3", cursor: "pointer" }} /></Col><Col span={5}> <Popconfirm
          title="Delete the report"
          description="Are you sure to delete this report?"
          onConfirm={() => {
            props.deleteReport({ id: record.id })
          }}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ color: "#ff7043", cursor: "pointer" }} />
        </Popconfirm>
          </Col></Row>


      },
    },
  ];
  const onShowDetail = () => {
    setOpen(!open)
  }
  const onClose = () => {
    setOpen(false)
    props.closeForm()
  }
  React.useEffect(() => {
    // eslint-disable-next-line react/prop-types
    props.getReport({ page: 1, limit: 20 })
  }, [])
  
  const dataResource = React.useMemo(() => {
    return props.store.data.map((item, index) => {
      return {
        ...item,
        index: (props.store.page - 1) * props.store.limit + index + 1
      }
    })
  }, [props.store.data, props.store.limit, props.store.page])
  return (
    <div>
      <DetailForm open={open} onOpen={onShowDetail} onClose={onClose} item={props.store.detail} title="DETAIL REPORT INFORMATION" />
      <TableCommon columns={columns} pageSize={props.store.limit} totalPage={props.store.totalPage} data={dataResource} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    store: state.ReportReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReport: (data) => {
      dispatch(actions.listReportRequest(data))
    },
    getDetail: (data) => {
      dispatch(actions.detailReportRequest(data))
    }, deleteReport: (data) => {
      dispatch(actions.deleteReportRequest(data))
    },
    closeForm: () => {
      dispatch(actions.closeDetail())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportTable);
