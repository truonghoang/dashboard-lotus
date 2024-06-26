import React from "react";
import { connect } from "react-redux";
import { FilterOutlined } from "@ant-design/icons";
import { Select, Input, Button, Radio } from "antd";
import {reason_select} from "../../utilizings/array"
import "@/styles/Filter.scss";
export const Filter = (props) => {
  const { isSearch, isReason, isNew,onSelect,onFilterTime,reloadData, onSearch } = props;
  
  const [orderBy, setOrderBy] = React.useState("DESC");
  const handleSelect = (value) => {
    onSelect({page:1,limit:10,reason:value})
  };
  const handleSearch = (value) => onSearch(value);
  return (
    <div className="wrap-filter">
      <div className="filter-reason">
        <div className="filter-icon">
          <FilterOutlined />
          Lọc:{" "}
        </div>

      {isReason ?   <Select
          className="filter-select"
          placeholder=" lí do"
          onChange={handleSelect}
          options={reason_select}
        />:""}
      </div>
      {isNew ? (
        <div>
          <Radio.Group
            className="orderBy"
            name="filterDate"
            buttonStyle="solid"
            defaultValue={orderBy}
            onChange={(e)=>{
              onFilterTime({orderBy:e.target.value})
            }}
          >
            <Radio.Button value={"ASC"}>Cũ nhất</Radio.Button>
            <Radio.Button value={"DESC"}>Mới nhất</Radio.Button>
          </Radio.Group>
        </div>
      ) : (
        ""
      )}
      {isSearch ? (
        <Input.Search
          className="search"
          placeholder="tìm số điện thoại hoặc tên"
          onSearch={handleSearch}
          enterButton
        />
      ) : (
        ""
      )}
      <Button type="dashed" className="btn-reload" onClick={()=>{reloadData()}}>Reload</Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
