import { Icon } from "antd";
import { Btn } from "@components";

export default ({ index, item, showModal }) => (
  <div
    className="flex h60 pl20 flex ai-center c333 font14"
    style={{ backgroundColor: `${index % 2 === 0 ? "#fff" : "#f5f7fa"}` }}
  >
    <div className="text-overflow-one pr10" style={{ width: "200px" }}>
      {item.product_name || "暂无"}
    </div>
    <div className="text-overflow-one pr10" style={{ width: "155px" }}>
      {item.money || "暂无"}
    </div>
    <div className="text-overflow-one pr10" style={{ width: "260px" }}>
      {item.created_at || "暂无"}
    </div>
    {item.status === 1 ? (
      <div className="c999" style={{ width: "190px" }}>
        <Icon className="pr5" type="close-circle-o" />已关闭
      </div>
    ) : item.type === 2 ? (
      <div style={{ width: "190px", color: "#71b247" }}>
        <Icon className="pr5" type="check-circle-o" />已成功
      </div>
    ) : (
      <div style={{ width: "190px", color: "#e4393c" }}>
        <Icon className="pr5" type="clock-circle-o" />进行中
      </div>
    )}
    <Btn
      onClick={() => showModal(item || {})}
      className="c-main"
      con="查看详情"
    />
  </div>
);
