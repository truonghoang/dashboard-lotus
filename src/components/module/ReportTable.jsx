import React from "react";
import { connect } from "react-redux";
import TableCommon from "../common/Table";
import { Row, Col } from "antd";
import { EyeOutlined } from "@ant-design/icons"
import {useLocation,useSearchParams} from "react-router-dom"
import DetailForm from "../common/DetailForm";
import * as actions from "../../redux/reducers/Report"
import Filter from "../module/Filter";

export const ReportTable = (props) => {
  const [open, setOpen] = React.useState(false)
  const location = useLocation()
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
    if(location.search){
      const queryParams = new URLSearchParams(location.search);
      const page =queryParams.get("page")
      const limit =queryParams.get("limit")
      const orderBy = queryParams.get("sort")
      props.getReport({page,limit,orderBy})
    }else{
      props.getReport({ page: 1, limit: 10,orderBy:"ASC" })
    }
   
  }, [location.search])
 
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
  const onSearch =(value) =>{ props.searchReport({page:1,limit:20,keySearch:value})}
  const reloadData = ()=>{ props.getReport({page:1,limit:10,orderBy:"ASC"})}
  const onSelect =(value)=>{ props.filterByReason(value)}
 const onFilter = (value)=>{props.getReport({...value,page:1,limit:10})}
  return (
    <div>
    <Filter onSearch ={onSearch} reloadData={reloadData} isSearch={true} isNew={true} isReason={true} onSelect ={onSelect} onFilterTime={onFilter}/>
      <DetailForm open={open} onOpen={onShowDetail} onClose={onClose} item={props.store.detail} title="DETAIL REPORT INFORMATION" />
      <TableCommon columns={columns} pageSize={props.store.limit} totalPage={props.store.totalPage} data={dataResource}   />
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
    filterByReason : (data)=>{
      dispatch(actions.filterByReasonRequest(data))
    },
    searchReport: (data)=>{
      dispatch(actions.searchReportRequest(data))
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
