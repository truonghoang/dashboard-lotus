import React from "react";
import { connect } from "react-redux";

import { Select, Input, Radio } from "antd";
import "@/styles/Report.scss";
export const ReportForm = (props) => {
  const [value1, setValue1] = React.useState("Tin Rác");
  const plainOptions = [
    "Tin Rác",
    "Bạo lực",
    "Lạm dụng trẻ em ",
    "Nội dung khiêu dâm",
    "Khác",
  ];
  const options = [];
  for (let i = 1; i < 10; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange1 = ({ target: { value } }) => {
    console.log("radio1 checked", value);
    setValue1(value);
  };
  return (
    <div className="form-report">
      <div className="block-reporter">
        <span className="title">Reporter</span>
        <Select
          mode="tags"
          className="select-reporter"
          placeholder="User Report"
          onChange={handleChange}
          options={options}
        />
       
        <span className="title">reported user</span>

        <Select
          mode="tags"
          className="select-reporter"
          placeholder="User Reported"
          onChange={handleChange}
          options={options}
        />
      </div>
      <div className="block-reported">
        <span className="title">Reason Report</span>
        <Radio.Group
          className="radio-sel"
          options={plainOptions}
          onChange={onChange1}
          value={value1}
        />
        <span className="title">Message for other reason</span>
        <Input.TextArea rows={7} className="message" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
