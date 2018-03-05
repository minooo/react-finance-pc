import { Icon } from "antd";

export default ({ icoType, title, caption, ...rest }) => (
  <div className="flex ai-center jc-center column w-100 h-100">
    <Icon type={icoType || "close-circle-o"} {...rest} />
    {title && <div className="font22 pt10 pb5 c333">{title}</div>}
    <div className="font16 c999">{caption || "暂无相关数据"}</div>
  </div>
);
