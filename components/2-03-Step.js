export default ({ index, focus, text }) => (
  <div className="relative z-index10 equal">
    {focus > index && (
      <div className="absolute-full z-index50 opacity-half bg-white" />
    )}
    <div style={{ paddingTop: "7px" }} className="relative h20">
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          lineHeight: "20px"
        }}
        className={`h20 w20 circle z-index20 translate-center c-white font14 bold text-center ${
          focus < index ? "bg-df" : "bg-main"
        }`}
      >
        {index + 1}
      </div>
      <div
        style={{
          height: "6px",
          borderRight: "1px solid #fff",
          borderLeft: "1px solid #fff"
        }}
        className={focus < index ? "bg-df" : "bg-main"}
      />
    </div>
    <div
      style={{ lineHeight: "36px" }}
      className={`h36 text-center font14 bold ${
        focus < index ? "c-a5" : "c-main"
      }`}
    >
      {text}
    </div>
  </div>
);
