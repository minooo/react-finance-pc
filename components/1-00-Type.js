import { WrapLink } from "@components";

export default ({ item }) => (
  <WrapLink
    style={{ width: "210px", height: "180px" }}
    className="flex column jc-center ai-center bg-body"
    href="/1-loan/1-home"
    as={`/loan?type=${0}`}
  >
    <div className="font20 c333">{item.title}</div>
    <div className="font14 c999">{item.caption}</div>
    <img src={item.img} alt="" className="h70 w70 mt20" />
  </WrapLink>
);
