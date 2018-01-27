import { Spin } from "antd";

export default () => (
  <div
    style={{
      position: "fixed",
      zIndex: 200,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: "rgba(255,255,255,.1)"
    }}
    className="flex jc-center ai-center"
  >
    <Spin size="large" />
  </div>
);
