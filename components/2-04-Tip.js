import { Icon } from "antd"

export default ({ ico, text, textClass }) => (
  <div style={{ backgroundColor: "#edf4ff" }} className="h88 flex jc-center ai-center">
    <Icon type={ico} className="font24 c-main" />
    <span className={`font18 bold ml10 ${textClass || "c666"}`}>{text}</span>
  </div>
);
