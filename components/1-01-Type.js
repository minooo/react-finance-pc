export default ({ item }) => (
  <div
    style={{ width: "210px", height: "180px" }}
    className="flex column jc-center ai-center bg-body"
  >
    <div className="font20 c333">{item.title}</div>
    <div className="font16 c999 text-overflow-1">{item.caption}</div>
    <img className="w70 h70 mt20" alt="" src={item.img} />
  </div>
);
