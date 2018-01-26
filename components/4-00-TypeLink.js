import { Btn } from "@components";

export default ({ item, index, newTypeFocus, onNewTypeClick }) => (
  <Btn
    hor
    btnClass={`w110 h34 r2 mr20 ${newTypeFocus === index ? "new-active" : "new-default"}`}
    title={item.title}
    con={
      <span
        className={`${
          newTypeFocus === index ? "c-white" : "c-main"
        } text-center font14 text-overflow-one lh100`}
      >
        {item.title.length > 5 ? `${item.title.substr(0, 5)}...` : item.title}
      </span>
    }
    onClick={() => onNewTypeClick(item.id, index)}
  />
);
