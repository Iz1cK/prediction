import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import Match from "../../components/Match";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("predictions")) {
      localStorage.setItem("predictions", []);
    } else {
      setPredictions(JSON.parse(localStorage.getItem("predictions")));
    }
  }, []);

  useEffect(() => {
    console.log(predictions);
  }, [predictions]);

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
      {tempData.matches.map((match, index) => {
        return (
          <Match
            match={match}
            matchid={index}
            predictions={predictions}
            setPredictions={setPredictions}
            key={index}
          ></Match>
        );
      })}
    </>
  );
}

export default Home;
