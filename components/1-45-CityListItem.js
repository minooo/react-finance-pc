import { WrapLink } from "@components";

export default ({ item, index }) => (
  <WrapLink
    href="/1-loan/1-home"
    as={`/loan?typeloan=${item.id}&typeloanfocus=${index + 2}`}
    className={`home-citybg-${index} home-city-samll plr25 pt30 c333 block`}
    style={{ width: "50%", height: "236px" }}
  >
    <div className="font26 mb20 lh120 text-overflow-one bold c333">
      {item.name}
    </div>
    <div className="font14 lh150 text-overflow-2 c333">{item.description}</div>
  </WrapLink>
);
