import React from "react";
import { connect } from "react-redux";
import {useLocation} from "react-router-dom"
import TableCommon from "../common/Table";
import { Col, Row } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import * as actions from "../../redux/reducers/User";
import DetailForm from "../common/DetailReportedUser";
export const UserTable = (props) => {
  const [detail,setDetail] =React.useState({})
  const columns = [
    {
      title: "Thứ Tự",
      width: 100,
      dataIndex: "index",
      align: "center",
      key: "index",
    },
    {
      title: "Tên Người Báo Cáo",
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
      title: "Lí Do Báo Cáo",
      dataIndex: "reason_label",
      align: "center",
      key: "reason",
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
                   setDetail(record)
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
    // eslint-disable-next-line react/prop-types
    if(location.search){
      const queryParams = new URLSearchParams(location.search);
      const page =queryParams.get("page")
      const limit =queryParams.get("limit")
      const orderBy = queryParams.get("sort")
      props.reportUser({page,limit,orderBy})
    }else{
      props.reportUser({ page: 1, limit: 10,orderBy:"ASC" })
    }
   
  }, [location.search])
  React.useEffect(() => {
    
   const path= location.pathname.split("/")
    props.reportUser({ page: 1, limit: 10,id:path[3] });
  }, []);

  const dataResource = React.useMemo(() => {
    return props.store.data.map((item, index) => {
        let reason_label
     
      if (item.reason==0){
        reason_label="Spam"
      }else if(item.reason==1){
        reason_label="Tin rác"
      }
      return {
        ...item,
        fullName: `${item.first_name}  ${item.last_name}`,
        reason_label: reason_label,
        index:  index + 1,
      };
    });
  }, [props.store.data, props.store.limit, props.store.page]);


  const onSearch =(value) =>{ props.searchReport({page:1,limit:20,keySearch:value})}
  const reloadData = ()=>{ props.getReport({page:1,limit:10,orderBy:"ASC"})}
  const onSelect =(value)=>{ props.filterByReason(value)}
 const onFilter = (value)=>{props.getReport({...value,page:1,limit:10})}
  return (
    <div>
     <Filter onSearch ={onSearch} reloadData={reloadData} isSearch={true} isNew={true} isReason={true} onSelect ={onSelect} onFilterTime={onFilter}/>
    <DetailForm open={open} onOpen={onShowDetail} onClose={onClose} item={detail} title="DETAIL REPORT INFORMATION" />
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
    reportUser: (data) => {
      dispatch(actions.listReportUserRequest(data));
    },
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
