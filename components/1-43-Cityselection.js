import { HomeRankingList } from "@components";
import uuid from "uuid/v4";

export default ({ citySelection, rankingList }) => (
  <div className="flex box lh120">
    <div className="plr20 pt30 c333" style={{ height: "560px", width: "860px" }}>
      <div className="flex jc-between">
        <div className="font20">{citySelection.type}</div>
        <div className="font16">更多</div>
      </div>
      <div className="flex mt20">
        <div className="plr30" style={{ width: "345px", height: "474xp", paddingTop: "50px" }}>
          <div className="font26 mb20">{citySelection.header.title}</div>
          <div className="font14">{citySelection.header.content}</div>
        </div>
        <div className="flex wrap equal">
          {citySelection.list &&
            citySelection.list.length > 0 && citySelection.list.map((item) => (
              <div key={uuid()} className="plr25 pt30" style={{ width: "236px", height: "236px" }}>
                <div className="font26 mb20">{item.title}</div>
                <div className="font14">{item.content}</div>
              </div>
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
