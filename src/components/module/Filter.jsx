import React from "react";
import { connect } from "react-redux";
import { FilterOutlined } from "@ant-design/icons"
import { Select, Input, Row, Col,Radio } from "antd";
import "@/styles/Filter.scss"
export const Filter = (props) => {
  const options = [
    {
      label: "Spam",
      value: 0,
    },
    {
      label: "Tin rác",
      value: 1,
    },
  ];
  const [orderBy,setOrderBy] =React.useState("ASC")
  const handleSelect = (value) => {
    console.log(value);
  };
  const onSearch = (value) => console.log(value);
  return (
    <div className="wrap-filter">
      <div className="filter-reason">
      <div className="filter-icon"><FilterOutlined />Lọc: </div>

       <Select
        className="filter-select"
        placeholder=" lí do"
        onChange={handleSelect}
        options={options}
      />
      </div>
<div>
    <Radio.Group className="orderBy" name="filterDate" buttonStyle="solid" defaultValue={orderBy}>
    <Radio.Button value={"ASC"}>Mới nhất</Radio.Button>
    <Radio.Button value={"DESC"}>Cũ nhất</Radio.Button>

  </Radio.Group>

</div>
      <Input.Search className="search" placeholder="tìm kiếm theo số điện thoại" onSearch={onSearch} enterButton />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = () => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
