import { Fragment } from "react";
import uuid from "uuid/v4";
import { Select } from "antd"

const { Option } = Select
export default ({ title, options, onSelectChange, type }) => (
  <Fragment>
    <div className="w80 font14 c666">{title}</div>
    <Select
      defaultValue={options[0].id}
      className="w120 mb10 mt10"
      onChange={val => onSelectChange(val, type)}
    >
      {
        options.map(item => <Option key={uuid()} value={item.id}>{item.title}</Option>)
      }
    </Select>
  </Fragment>
);
