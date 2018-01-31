import uuid from "uuid/v4";
import { WrapLink } from "@components";

export default ({ item, index }) => (
  <div style={{ width: "224px" }}>
    <div
      style={{ height: "140px" }}
      className={`home-shdow-sm mb10 home-hotnew-bg${index}`}
    />
    {item &&
      item.length > 0 &&
      item.map(n => (
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
