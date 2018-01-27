import { Fragment } from "react";
import uuid from "uuid/v4";
import { Btn } from "@components";

export default ({ cityFilters, onCityChoice, state }) => (
  <Fragment>
    {cityFilters.map(item => (
      <div key={uuid()} className="flex mb25 pl20">
        <div className="font14 c999 equal-no pr20">{item.title}</div>
        <div className="flex wrap">
          {item.list &&
            item.list.length > 0 &&
            item.list.map((x, i) => (
              <Btn
                key={uuid()}
                btnClass="mr30 mb5"
                con={
                  <span
                    className={`${
                      state[`${item.key}Focus`] === i ? "c-main" : "c333"
                    } font14`}
                  >
                    {x && (x.name || x.title)}
                  </span>
                }
                onClick={() => onCityChoice(item.key, x.id, i)}
              />
            ))}
        </div>
      </div>
    ))}
  </Fragment>
);
