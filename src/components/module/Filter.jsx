import React from "react";
import { connect } from "react-redux";
import { Select,Input } from "antd";
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
  const handleSelect = (value) => {
    console.log(value);
  };
  const onSearch = (value) => console.log(value);
  return (
    <div className="wrap-filter">
      <Select
      className="filter-reason"
       
        placeholder="Chọn lí do ban"
        onChange={handleSelect}
        options={options}
      />
       <Input.Search placeholder="input search text" onSearch={onSearch} enterButton />
    </div>
  );
};

const mapStateToProps = (state) => {
    return{}
};

const mapDispatchToProps = ()=>{
    return{}
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
