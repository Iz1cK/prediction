import React, { useState, useEffect } from "react";
import style from "./style.module.css";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [picked, setPicked] = useState(false);

  //will be array in future for more days
  let tempData = {
    date: "Today - 17 June",
    matches: [
      {
        time: "22:00",
        team1: "G2 Esports",
        team1Pic:
          "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FG2-FullonDark.png",
        team2: "Astralis",
        team2Pic:
          "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FAST-FullonDark.png",
        league: "LEC",
        format: "Best Of 1",
      },
      {
        time: "23:00",
        team1: "Mad Lions",
        team1Pic:
          "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819614211_mad-2021-worlds.png",
        team2: "SK Gaming",
        team2Pic:
          "https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1643979272144_SK_Monochrome.png",
        league: "LEC",
        format: "Best Of 1",
      },
      {
        time: "00:00",
        team1: "Evil Genuises",
        team1Pic:
          "http://static.lolesports.com/teams/1592590374862_EvilGeniusesEG-01-FullonDark.png",
        team2: "Fly Quest",
        team2Pic: "http://static.lolesports.com/teams/flyquest-new-on-dark.png",
        league: "LCS",
        format: "Best Of 1",
      },
    ],
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className={style.date}>
        <h1>{tempData.date}</h1>
      </div>
      {tempData.matches.map((match) => {
        return (
          <div className={style.line}>
            <div className={style.left}>
              <div className={style.time}>
                <h1>{match.time}</h1>
                <h1 className={style.approx}>APPROX</h1>
              </div>
            </div>
            <div className={style.center}>
              <div className={style.team1}>
                <img
                  src={match.team1Pic}
                  alt={match.team1}
                  width="75px"
                  height="75px"
                />
                <div className={style.teamInfo}>
                  <h2>{match.team1}</h2>
                </div>
              </div>
              <div className={style.vs}>VS</div>
              <div className={style.team2}>
                <img
                  src={match.team2Pic}
                  alt={match.team2}
                  width="75px"
                  height="75px"
                />
                <div className={style.teamInfo}>
                  <h2>{match.team2}</h2>
                </div>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.leagueAndFormat}>
                <div className={style.league}>LEC</div>
                <div className={style.format}>best of 1</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Home;
