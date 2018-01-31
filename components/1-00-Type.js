import { WrapLink } from "@components";

export default ({ item, index }) => (
  <WrapLink
    style={{ width: "220px", height: "260px" }}
    className="flex column ai-center home-shdow-mid bg-white transition home-type-hover"
    href="/1-loan/2-home-speed"
    as={`/loan/speed?typeloan=${item.id}&typeloanfocus=${index + 1}`}
  >
    <div className="font24 c333 bold text-overflow-1 mt25 mt10">
      {item.name}
    </div>
    <div className="font16 c333 text-overflow-1">{item.description}</div>
    <div
      style={{ width: "220px", marginTop: "35px" }}
      className="h100 flex jc-center"
    >
      <img
        src={`http://public.duduapp.net/finance/pc-static/img/top_speed_type_${index}.png`}
        alt=""
        style={{ maxWidth: "220px", maxHeight: "100px" }}
      />
    </div>
  </WrapLink>
);
