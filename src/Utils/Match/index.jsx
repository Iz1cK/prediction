import React, { useState, useEffect } from "react";
import style from "./style.module.css";

const Match = ({ match, matchid: matchid }) => {
  const [team1Picked, setTeam1Picked] = useState(false);
  const [team2Picked, setTeam2Picked] = useState(false);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("predictions")) {
      localStorage.setItem("predictions", []);
    } else {
      setPredictions(localStorage.getItem("predictions"));
    }
  }, []);

  useEffect(() => {
    // localStorage.setItem("predictions", predictions);
    console.log(predictions);
  }, [predictions]);
  return (
    <div className={style.line}>
      <div className={style.left}>
        <div className={style.time}>
          <h1>{match.time}</h1>
          <h1 className={style.approx}>APPROX</h1>
        </div>
      </div>
      <div className={style.center}>
        <div
          className={`${style.team1} ${
            team1Picked
              ? style.team1Picked1
              : team2Picked
              ? style.team2Picked1
              : ""
          }`}
          onClick={(e) => {
            if (team1Picked) {
              console.log({
                matchid: matchid,
                team1: match.team1,
                team2: match.team2,
                prediction: match.team1,
                league: match.league,
                format: match.format,
                time: match.time,
              });
              setPredictions(
                predictions.push({
                  matchid: matchid,
                  team1: match.team1,
                  team2: match.team2,
                  prediction: match.team1,
                  league: match.league,
                  format: match.format,
                  time: match.time,
                })
              );
            } else {
              setPredictions(
                predictions.filter(
                  (prediction) => prediction.matchid !== matchid
                )
              );
            }
            setTeam1Picked(false);
            setTeam2Picked(!team2Picked);
          }}
        >
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
        <div
          className={`${style.team2} ${
            team1Picked
              ? style.team1Picked2
              : team2Picked
              ? style.team2Picked2
              : ""
          }`}
          onClick={(e) => {
            setTeam1Picked(!team1Picked);
            setTeam2Picked(false);
          }}
        >
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
};

export default Match;
