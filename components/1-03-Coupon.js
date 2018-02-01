import { WrapLink } from "@components";

export default ({ item, index, len }) => (
  <WrapLink
    href={item.url}
    style={{ width: "224px", height: "140px" }}
    className={`${index === len ? "" : "mb30"} home-shdow-sm img-bg`}
  >
    <img src={item.image} alt={item.name} className="w-100 h-100" />
  </WrapLink>
);
