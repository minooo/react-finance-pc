import { WrapLink } from "@components";

export default ({ item, index }) => (
  <WrapLink
    href="/index"
    as="/"
    className={`home-citybg-${index} home-city-samll plr25 pt30 c333 block`}
    style={{ width: "50%", height: "236px" }}
  >
    <div className="font26 mb20 lh120 text-overflow-1 bold c333">{item.title}</div>
    <div className="font14 lh150 text-overflow-2 c333">{item.content}</div>
  </WrapLink >
)

