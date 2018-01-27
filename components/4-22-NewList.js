import { WrapLink } from "@components";

export default ({ item }) => (
  <WrapLink
    style={{ marginBottom: "40px" }}
    href="/"
    as="/"
    className="flex c333 pr20 new-list-active"
  >
    <div
      style={{
        width: "176px",
        top: -10,
        left: -20
      }}
      className="img-bg h110 relative new-shadow"
    >
      <img className="w-100 h-100" src={item.img} alt="" />
    </div>
    <div style={{ width: "642px" }} className="flex h120 column jc-between ptb15">
      <div className="font18 bold  text-overflow-one">{item.title}</div>
      <div className="font14  text-overflow-one">{item.text}</div>
      <div className="flex c666 jc-end new-color">
        <span style={{ marginRight: "42px" }}>{item.time}</span>
        <span className="new-browse pl15">{item.number}</span>
      </div>
    </div>
  </WrapLink>
);
