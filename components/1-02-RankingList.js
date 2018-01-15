import uuid from "uuid/v4";

export default ({ rankingList }) => (
  <div className="box flex flex jc-end c333">
    <div
      className="pl20 pr30 pt20 bg-white font14"
      style={{ width: "310px", height: "485px" }}
    >
      <div className="flex jc-between mb30">
        <div>{rankingList.type}</div>
        <div>
          <span className="mr15">{rankingList.new}</span>
          <span>{rankingList.hot}</span>
        </div>
      </div>
      {rankingList.list.map(item => (
        <div key={uuid()} className="flex mb15">
          <div>
            <img
              src={item.img}
              alt=""
              style={{ width: "65px", height: "65px" }}
            />
          </div>
          <div className="flex equal column jc-center">
            <div className="ml15 flex jc-between">
              <span>{item.title}</span>
              <span>{item.number}</span>
            </div>
            <div className="mt15 ml10 font12">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
