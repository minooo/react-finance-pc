import { WrapLink } from "@components";
import uuid from "uuid/v4";

export default ({ item, onCacheCity }) => (
  <div key={uuid()} className="flex city-list">
    <div className="w30 lh100 c666 bold font14 flex ai-center jc-center city-serial">
      {item.char}
    </div>
    <div className="equal lh100 font14 city-item">
      {item.city &&
        item.city.length > 0 &&
        item.city.map(i => (
          <WrapLink
            key={uuid()}
            onClick={() => onCacheCity(i.name)}
            style={{ marginBottom: "12px" }}
            className=" ml30 c333 inline-block"
          >
            {i.name}
          </WrapLink>
        ))}
    </div>
  </div>
);
