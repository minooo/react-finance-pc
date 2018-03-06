export default ({ style, title, caption }) => (
  <div className="flex ai-center jc-center column w-100 h-100">
    <div className="lh100" style={{ fontSize: "60px" }}>
      <div className={style || "nodata-ico"} />
    </div>
    <div className="font22 pt10 pb5" style={{ color: "#333" }}>
      {title || ""}
    </div>
    <div className="font16 c999">{caption || "暂无相关数据"}</div>
  </div>
);
