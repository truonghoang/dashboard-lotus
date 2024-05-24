import React from "react";
import { Pagination, Table } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "@/styles/Table.scss";
 const TableCommon = ({
  data = [],
  totalPage = 1,
  pageSize = 1,
  onChangePage,
  columns = [],
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangePage = React.useCallback(
    (page, limit,sort) => {
      navigate({
        pathname: location.pathname,
        search: `page=${page}&&limit=${limit}&&sort=asc`,
      });

      onChangePage && onChangePage(page, limit,sort);
    },
    [history, location.pathname]
  );
  const page = React.useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    return parseInt(queryParams.get("page") || 1);
  }, [location.search]);
  return (
    <div className="wrap-table">
      <Table
        className="container-table"
        columns={columns}
        dataSource={data}
        pagination={false}
        size="middle"
        scroll={{
          y: 600,
        }}
      />
      <Pagination
        className="pagination"
        showSizeChanger={false}
        showQuickJumper={true}
        total={pageSize * totalPage}
        pageSize={pageSize || 20}
        current={page || 1}
        pageSizeOptions={[20, 50, 100]}
        size="small"
        onChange={handleChangePage}
      />
    </div>
  );
};


export default TableCommon;
