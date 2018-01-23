import uuid from "uuid/v4";
import { WrapLink } from "@components";

export default ({ item }) => (
  <div style={{ width: "224px" }}>
    <div style={{ height: "140px" }} className="img-bg home-shdow-sm mb10">
      <img src={item.img} className="w-100 h-100" alt="" />
    </div>
    {item.list &&
      item.list.length > 0 &&
      item.list.map(n => (
        <WrapLink
          key={uuid()}
          href="/index"
          as="/"
          style={{ marginBottom: "7px" }}
          className="font14 c333 home-new-link pl20 text-overflow-one block"
          title={n.title}
        >
          {n.title}
        </WrapLink>
      ))}
  </div>
);
