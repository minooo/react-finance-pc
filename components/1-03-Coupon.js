import { WrapLink } from "@components";

export default ({ item, index, len }) => (
  <WrapLink
    href={item.link}
    style={{ width: "224px", height: "140px" }}
    className={`${
      index === len ? "" : "mb30"
    } home-shdow-sm img-bg`}
  >
    <img src={item.img} alt="" className="w-100 h-100" />
  </WrapLink>
);
