import { HomeRankingList, WrapLink } from "@components";
import uuid from "uuid/v4";

export default ({ citySelection, rankingList }) => (
  <div className="flex box">
    <div className="plr20 pt30 c333 home-shdow-mid relative" style={{ height: "560px", width: "860px" }}>
      <div className="home-loan-top">
        <div className="home-loantop-text font14 h20" style={{ width: "200px" }}>
          CITY SELECTION LOAN
        </div>
      </div>
      <div className="flex jc-between">
        <div className="font20">{citySelection.type}</div>
        <WrapLink className="font16 pointer">更多</WrapLink>
      </div>
      <div className="flex mt20">
        <WrapLink className="plr30 home-loanlist-bg" style={{ width: "345px", height: "474xp", paddingTop: "50px" }}>
          <div className="font26 mb20 lh100">{citySelection.header.title}</div>
          <div className="font14 lh100">{citySelection.header.content}</div>
        </WrapLink>
        <div className="flex wrap equal">
          {citySelection.list &&
            citySelection.list.length > 0 && citySelection.list.map((item) => (
              <WrapLink key={uuid()} className="plr25 pt30 home-loanlist-bg" style={{ width: "236px", height: "236px" }}>
                <div className="font26 mb20 lh100">{item.title}</div>
                <div className="font14 lh100">{item.content}</div>
              </WrapLink>
            )
            )}
        </div>
      </div>
    </div>
    <div className="mt20 mb20">
      {rankingList &&
        rankingList.list.length > 0 && (
          <HomeRankingList rankingList={rankingList} />
        )}
    </div>
  </div>

)
