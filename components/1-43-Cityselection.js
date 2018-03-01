import uuid from "uuid/v4";
import {
  Ranking,
  WrapLink,
  HomeCityListItem,
  HomeRankListItem
} from "@components";

export default ({ citySelection, rankingList }) => (
  <div className="flex box">
    <div
      className="plr20 pt25 c333 home-shdow-mid relative z-index10 bg-white"
      style={{ height: "560px", width: "860px" }}
    >
      <div className="home-loan-top">
        <div
          className="home-loantop-text font14 h20 bold"
          style={{ width: "200px" }}
        >
          CITY SELECTION LOAN
        </div>
      </div>
      <div className="flex jc-between">
        <div className="font20 lh100 bold">同城精选贷款</div>
        <WrapLink href="/1-loan/1-home" as="/loan" className="font16 more-link">
          更多
        </WrapLink>
      </div>
      <div className="flex mt20">
        {citySelection[0] && (
          <WrapLink
            href="/1-loan/1-home"
            as={`/loan?typeloan=${citySelection[0].id}&typeloanfocus=1`}
            className="plr30 img-bg c333 block home-citybg-big"
            style={{ width: "345px", height: "472xp", paddingTop: "50px" }}
          >
            <div className="font26 mb20 lh120 text-overflow-one bold c333">
              {citySelection[0].name}
            </div>
            <div className="font14 lh150 text-overflow-2 c333">
              {citySelection[0].description}
            </div>
          </WrapLink>
        )}

        <div className="equal flex wrap overflow-h">
          {citySelection.length > 0 &&
            citySelection
              .slice(1, 5)
              .map((item, index) => (
                <HomeCityListItem key={uuid()} index={index} item={item} />
              ))}
        </div>
      </div>
    </div>
    <div className="mt20 mb20 equal overflow-h home-shdow-mid">
      <div
        className="plr20 pt20 bg-white font14"
        style={{ height: "520px" }}
      >
        <Ranking
          title="同城贷排行榜"
          bg="home-loancity-bg"
          list={
            rankingList.new &&
            rankingList.new.list &&
            rankingList.new.list.length > 0 &&
            rankingList.new.list.map(item => (
              <HomeRankListItem key={uuid()} item={item} isrank />
            ))
          }
          othList={
            rankingList.hot &&
            rankingList.hot.list &&
            rankingList.hot.list.length > 0 &&
            rankingList.hot.list.map(item => (
              <HomeRankListItem key={uuid()} item={item} isrank />
            ))
          }
        />
      </div>
    </div>
  </div>
);
