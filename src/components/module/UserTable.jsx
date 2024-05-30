import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import TableCommon from "../common/Table";
import { Col, Row } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import * as actions from "../../redux/reducers/User";
import DetailForm from "../common/DetailReportedUser";
import { label_reason } from "../../utilizings/array";
import Filter from "./Filter";
export const UserTable = (props) => {
  const [detail, setDetail] = React.useState({});
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
        return (
          <Row key={index}>
            <Col span={5} offset={9}>
              <EyeOutlined
                onClick={() => {
                  setDetail(record);
                  setOpen(true);
                }}
                style={{ color: "#2196f3", cursor: "pointer", fontSize: 20 }}
              />
            </Col>
          </Row>
        );
      },
    },
  ];
  const [open, setOpen] = React.useState(false);

  const location = useLocation();

  const onShowDetail = () => {
    setOpen(!open);
  };
  const onClose = () => {
    setOpen(false);
    props.closeForm();
  };

  React.useEffect(() => {
    const path = location.pathname.split("/");
    props.reportUser({ id: path[3], orderBy: "DESC" });
  }, []);

  const dataResource = React.useMemo(() => {
    return props.store.data.map((item, index) => {
      return {
        ...item,
        fullName: `${item.first_name}  ${item.last_name}`,
        reason_label: label_reason[item.reason],
        index: index + 1,
      };
    });
  }, [props.store.data, props.store.limit, props.store.page]);

  const reloadData = () => {
    const path = location.pathname.split("/");
    props.reportUser({ id: path[3], orderBy: "DESC" });
  };
  const onSelect = (value) => {
    const path = location.pathname.split("/");
    props.filterByReason({ reason: value.reason, id: path[3] });
  };
  const onFilter = (value) => {
    const path = location.pathname.split("/");
    props.reportUser({ ...value, id: path[3] });
  };

  return (
    <div>
      <Filter
        reloadData={reloadData}
        isSearch={false}
        isNew={true}
        isReason={true}
        onSelect={onSelect}
        onFilterTime={onFilter}
      />
      <DetailForm
        open={open}
        onOpen={onShowDetail}
        onClose={onClose}
        item={detail}
        title="DETAIL REPORT INFORMATION"
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
    filterByReason: (data) => {
      dispatch(actions.filterReportRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
