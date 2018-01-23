import { Btn } from "@components";

export default ({ item, index, len, cardTypeFocus, onCardTypeClick }) => (
  <Btn
    hor
    style={{
      borderRight: index !== len ? "1px solid #ccc" : "none"
    }}
    btnClass="plr20"
    title={item.title}
    con={
      <span
        className={`${
          cardTypeFocus === index ? "c333 bold" : "c666"
        } text-center font16 text-overflow-one lh100`}
      >
        {item.title.length > 5 ? `${item.title.substr(0, 5)}...` : item.title}
      </span>
    }
    onClick={() => onCardTypeClick(item.id, index)}
  />
);
