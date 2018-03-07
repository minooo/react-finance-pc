export default ({ title, caption, ico = "me-nodata-bg" }) => (
  <div className="flex ai-center jc-center column w-100 h-100 absolute">
    <div className={ico} />
    {title && <div className="font22 mb10 pb5 c333">{title}</div>}
    <div className="font16 c999">{caption || "暂无相关数据"}</div>
  </div>
);
