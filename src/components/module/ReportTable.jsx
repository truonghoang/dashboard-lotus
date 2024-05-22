import React from "react";
import { connect } from "react-redux";
import TableCommon from "../common/Table";
import { Row, Col } from "antd";
import { EyeOutlined } from "@ant-design/icons"
import DetailForm from "../common/DetailForm";
import * as actions from "../../redux/reducers/Report"
import Filter from "../module/Filter";

export const ReportTable = (props) => {
  const [open, setOpen] = React.useState(false)
 
  
  const columns = [
    {
      title: "Thứ Tự",
      width: 100,
      dataIndex: "index",
      align: "center",
      key: "index",
    },
    {
      title: "Tên Người Bị Báo Cáo",
      dataIndex: "full_name",
      align: "center",
      key: "full_name",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      align: "center",
      key: "phone",
    },
    {
      title: "Số Lượt Bị Báo Cáo",
      dataIndex: "total_reported",
      align: "center",
      key: "total_reported",
    },
    {
      title: "Thời Gian Báo Cáo",
      dataIndex: "created_at",
      align: "center", 
      key: "created_at",
    },
    {
      title: "Chức Năng",
      align: "center",
      dataIndex: "action",
      key: "action",
      render: (_, record, index) => {
        return <Row key={index}><Col span={5} offset={9}><EyeOutlined onClick={() => {

          props.getDetail({ id: record.id })
          setOpen(true)
        }} style={{ color: "#2196f3", cursor: "pointer",fontSize:20 }} /></Col>
        </Row>


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
        index: (props.store.page - 1) * props.store.limit + index + 1,
        full_name: `${item.firstName} ${item.last_name}`,
        phone: item.phone ? item.phone: `_`
      }
    })
  }, [props.store.data, props.store.limit, props.store.page])
  return (
    <div>
    <Filter/>
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
