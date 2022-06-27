import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import teamsColors from "../../utils/teamsColors.json";

const Match = ({ match, matchid: matchid, predictions, setPredictions }) => {
  const [team1Picked, setTeam1Picked] = useState(false);
  const [team2Picked, setTeam2Picked] = useState(false);

  return (
    <div
      className={style.line}
      style={{
        backgroundColor:
          teamsColors[
            team1Picked ? match.team1 : team2Picked ? match.team2 : ""
          ],
      }}
    >
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
            if (!team1Picked) {
              setPredictions(() =>
                predictions
                  .filter((prediction) => prediction.matchid !== matchid)
                  .concat({
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
            setTeam1Picked(!team1Picked);
            setTeam2Picked(false);
          }}
        >
          <img
            src={match.team1Pic}
            alt={match.team1}
            width="75px"
            height="75px"
          />
          <div className={style.teamInfo}>
            <h2 className={style.teamName}>{match.team1}</h2>
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
            if (!team2Picked) {
              setPredictions(() =>
                predictions
                  .filter((prediction) => prediction.matchid !== matchid)
                  .concat({
                    matchid: matchid,
                    team1: match.team1,
                    team2: match.team2,
                    prediction: match.team2,
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
            src={match.team2Pic}
            alt={match.team2}
            width="75px"
            height="75px"
          />
          <div className={style.teamInfo}>
            <h2 className={style.teamName}> {match.team2}</h2>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.leagueAndFormat}>
          <div className={style.league}>{match.league}</div>
          <div className={style.format}>{match.format}</div>
        </div>
      </div>
    </div>
  );
};

export default Match;
