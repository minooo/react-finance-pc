import React from "react";
import uuid from "uuid/v4";
import { Ranking, WrapLink, HomeCityListItem, HomeRankListItem } from "@components";

export default class extends React.Component {
  state = {
    ranktype: "new",
    imglist: this.props.citySelection.list.shift()
  }
  OnChangeLoahType = (type) => {
    if (type === "hot") {
      this.setState(() => ({
        ranktype: type,
      }));
    } else {
      this.setState(() => ({
        ranktype: type,
      }));
    }
  }

  render() {
    const { rankingList, citySelection } = this.props
    const { ranktype, imglist } = this.state
    const list = ranktype === "new" ? rankingList.list : rankingList.newlist
    return (
      <div className="flex box">
        <div className="plr20 pt25 c333 home-shdow-mid relative" style={{ height: "560px", width: "860px" }}>
          <div className="home-loan-top">
            <div className="home-loantop-text font14 h20 bold" style={{ width: "200px" }}>
              CITY SELECTION LOAN
            </div>
          </div>
          <div className="flex jc-between">
            <div className="font20 lh100 bold">同城精选贷款</div>
            <WrapLink href="/1-loan/1-home" as="/loan" className="font16 more-link">更多</WrapLink>
          </div>
          <div className="flex mt20">
            <WrapLink href="/" as="/" className="plr30 img-bg c333 block home-citybg-big" style={{ width: "345px", height: "472xp", paddingTop: "50px" }}>
              <div className="font26 mb20 lh120 text-overflow-1 bold c333">{imglist.title}</div>
              <div className="font14 lh150 text-overflow-2 c333">{imglist.content}</div>
            </WrapLink>
            <div className="equal flex wrap">
              {citySelection.list &&
                citySelection.list.length > 0 && citySelection.list.map((item, index) => (
                  <HomeCityListItem key={uuid()} index={index} item={item} />
                )
                )}
            </div>
          </div>
        </div>
        <div className="mt20 mb20 equal">
          <div
            className="plr20 pt20 bg-white font14 home-shdow-mid"
            style={{ height: "520px" }}
          >
            <Ranking OnChangeLoahType={this.OnChangeLoahType} title="同城贷排行榜" bg="home-loancity-bg" ranktype={ranktype} />
            {rankingList && (
              list &&
              list.length > 0 &&
              list.map(item => <HomeRankListItem key={uuid()} item={item} isrank="true" />)
            )}
          </div>
        </div>
      </div>
    )
  }
}
