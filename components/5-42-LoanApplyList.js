import { Icon } from "antd";
import { Btn } from "@components";

export default ({ index, item, showModal }) => (
  <div
    className="flex h60 pl20 flex ai-center c333 font14"
    style={{ backgroundColor: `${index % 2 === 0 ? "#fff" : "#f5f7fa"}` }}
  >
    <div className="text-overflow-1 pr10" style={{ width: "200px" }}>{item.name}</div>
    <div className="text-overflow-1 pr10" style={{ width: "155px" }}>{item.money}</div>
    <div className="text-overflow-1 pr10" style={{ width: "260px" }}>{item.time}</div>
    {
      item.type === "ing" ?
        (
          <div style={{ width: "190px", color: "#e4393c" }}>
            <Icon className="pr5" type="clock-circle-o" />进行中
          </div>
        )
        : (
          item.type === "success" ?
            (
              <div style={{ width: "190px", color: "#71b247" }}>
                <Icon className="pr5" type="check-circle-o" />已成功
              </div>
            )
            :
            (
              <div className="c999" style={{ width: "190px" }}>
                <Icon className="pr5" type="close-circle-o" />已关闭
              </div>
            )
        )
    }
    <Btn onClick={() => showModal(item.detailed || {})} className="c-main" con="查看详情" />
  </div>

)
