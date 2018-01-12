import React from "react";

export default class extends React.Component {
  componentDidMount() {
    console.info(this.props.err);
  }
  render() {
    return (
      <div className="flex column ai-center jc-center plr25 ptb20 h-full">
        <div className="font32 c333 ptb20">无法显示页面</div>
        <div className="font28 c999">
          抱歉，服务器获取数据失败，请稍后再试！
        </div>
      </div>
    );
  }
}
