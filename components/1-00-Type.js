import { WrapLink } from "@components";

export default ({ item }) => (
  <WrapLink
    style={{ width: "220px", height: "260px" }}
    className="flex column ai-center home-show-mid bg-white transition home-type-hover"
    href="/1-loan/1-home"
    as={`/loan?type=${0}`}
  >
    <div className="font24 c333 bold text-overflow-1 mt25 mt10">{item.title}</div>
    <div className="font16 c333 text-overflow-1">{item.caption}</div>
    <div style={{ width: "220px", marginTop: "35px" }} className="h100 flex jc-center">
      <img src={item.img} alt="" style={{ maxWidth: "220px", maxHeight: "100px" }} />
    </div>
  </WrapLink>
);
