import uuid from "uuid/v4";
import { HomeRankingList, WrapLink } from "@components";

export default ({ citySelection, rankingList }) => (
  <div className="flex box">
    <div className="plr20 pt30 c333 home-shdow-mid relative" style={{ height: "560px", width: "860px" }}>
      <div className="home-loan-top">
        <div className="home-loantop-text font14 h20 bold" style={{ width: "200px" }}>
          CITY SELECTION LOAN
        </div>
      </div>
      <div className="flex jc-between">
        <div className="font20 bold">{citySelection.type}</div>
        <WrapLink href="/1-loan/1-home" as="/loan" className="font16 more-link">更多</WrapLink>
      </div>
      <div className="flex mt20">
        <WrapLink href="/" as="/" className="plr30 img-bg c333" style={{ width: "345px", height: "474xp", paddingTop: "50px" }}>
          <div className="font26 mb20 lh120 text-overflow-1 bold c333">{citySelection.header.title}</div>
          <div className="font14 lh150 text-overflow-2 c333">{citySelection.header.content}</div>
        </WrapLink>
        <div className="flex wrap equal">
          {citySelection.list &&
            citySelection.list.length > 0 && citySelection.list.map((item) => (
              <WrapLink key={uuid()} href="/index" as="/" className="plr25 pt30 img-bg c333 block" style={{ width: "236px", height: "236px" }}>
                <div className="font26 mb20 lh120 text-overflow-1 bold c333">{item.title}</div>
                <div className="font14 lh150 text-overflow-2 c333">{item.content}</div>
              </WrapLink>
            )
            )}
        </div>
      </div>
    </div>
    <div className="mt20 mb20 equal">
      {rankingList && (
        <HomeRankingList rankingList={rankingList} loantype="city" />
      )}
    </div>
  </div>

)
