import { Fragment } from "react";
import uuid from "uuid/v4";
import { Select } from "antd";

const { Option } = Select;
export default ({ title, options, onSelectChange, type, value }) => (
  <Fragment>
    <div className="w80 font14 c999">{title}</div>
    <Select
      value={value}
      className="w120 mb10 mt10"
      onChange={val => onSelectChange(type, val)}
    >
      {options &&
        options.length > 0 &&
        options.map(item => (
          <Option key={uuid()} value={item.id}>
            {item.name}
          </Option>
        ))}
    </Select>
  </Fragment>
);
