import uuid from "uuid/v4";
import { HomeHotCard } from "@components";

export default ({ items }) =>
  Array(...Array(8)).map((item, index) => {
    if (items[index]) {
      return <HomeHotCard key={uuid()} item={items[index]} index={index} />;
    }
    return (
      <div
        key={uuid()}
        style={{ width: "170px" }}
        className={(index + 1) % 4 === 0 ? "" : "mr20"}
      />
    );
  });
