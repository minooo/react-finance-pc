import { Icon } from "antd";
import { Btn } from "@components";
import uuid from "uuid/v4";

export default ({ message, onDeletemessages }) => (
  <div style={{ padding: "50px" }}>
    {message &&
      message.length > 0 &&
      message.map(item => (
        <div key={uuid()} className="flex jc-between mb25 me-massage-list pl25">
          <div className="c333 font14">{item.content}</div>
          <Btn
            className="ml30"
            con={<Icon className="font20 c999" type="delete" />}
            onClick={() => onDeletemessages(item.id)}
          />
        </div>
      ))}
  </div>
);
