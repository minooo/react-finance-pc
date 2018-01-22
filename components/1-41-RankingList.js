import uuid from "uuid/v4";
import { Icon } from "antd";

export default ({ rankingList }) => (
  <div
    className="plr20 pt20 bg-white font14"
    style={{ height: "520px" }}
  >
    <div className="flex jc-between ai-center mb30">
      <div className="font22 c333">{rankingList.type}</div>
      <div className="font16 c666">
        <span className="mr5">{rankingList.new}</span>
        <span>|</span>
        <span className="ml5">{rankingList.hot}</span>
      </div>
    </div>
    {rankingList.list.map(item => (
      <div key={uuid()} className="flex mb10 pl10 pt20 pr20" style={{ width: "300px", height: "100px" }}>
        <div>
          <img
            src={item.img}
            alt=""
          />
        </div>
        <div className="flex equal jc-between pl15">
          <div className="flex column jc-around c333 font12">
            <div className="flex font16">
              {item.title}
            </div>
            <div>
              <span className="c-main">{item.number}</span>申请
            </div>
            <div className=" font12">{item.content}</div>
          </div>
          <div className="flex ai-center">
            <Icon type="right" style={{ fontSize: 14 }} />
          </div>
        </div>
      </div>
    ))}
  </div>
);
