import { WrapLink } from "@components";

export default ({ item }) => (
  <WrapLink
    style={{ marginBottom: "40px" }}
    href={`/3-new/2-detail?id=${item.id}`}
    as={`/new/${item.id}`}
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
      <img className="w-100 h-100" src={item.thumb} alt="" />
    </div>
    <div style={{ width: "642px" }} className="flex h120 column jc-between ptb15">
      <div className="font18 bold  text-overflow-one">{item.title}</div>
      <div className="font14  text-overflow-one">{item.description}</div>
      <div className="flex c666 jc-end new-color">
        <span style={{ marginRight: "42px" }}>{item.created_at && item.created_at.substr(0, 10)}</span>
        <span className="new-browse pl20">{item.view}</span>
      </div>
    </div>
  </WrapLink>
);
