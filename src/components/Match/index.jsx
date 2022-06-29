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
            team1Picked
              ? match.teams[0].code
              : team2Picked
              ? match.teams[1].code
              : ""
          ],
      }}
    >
      <div className={style.left}>
        <div className={style.time}>
          <h1>
            {match.date.split("T")[1].split(":")[0] +
              ":" +
              match.date.split("T")[1].split(":")[1]}
          </h1>
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
                    teams: match.teams,
                    prediction: match.teams[0],
                    league: match.league.leagueid,
                    format: match.format,
                    time:
                      match.date.split("T")[1].split(":")[0] +
                      ":" +
                      match.date.split("T")[1].split(":")[1],
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
            e.target.style.backgroundColor = e.target.style.backgroundColor;
            console.log(e.target.style.backgroundColor);
          }}
        >
          <img
            src={match.teams[0].image}
            alt={match.teams[0].code}
            width="75px"
            height="75px"
          />
          <div className={style.teamInfo}>
            <h2 className={style.teamName}>{match.teams[0].name}</h2>
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
                    teams: match.teams,
                    prediction: match.teams[1],
                    league: match.league.leagueid,
                    format: match.format,
                    time:
                      match.date.split("T")[1].split(":")[0] +
                      ":" +
                      match.date.split("T")[1].split(":")[1],
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
            src={match.teams[1].image}
            alt={match.teams[1].code}
            width="75px"
            height="75px"
          />
          <div className={style.teamInfo}>
            <h2 className={style.teamName}> {match.teams[1].name}</h2>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.leagueAndFormat}>
          <div className={style.league}>{match.league.name}</div>
          <div className={style.format}>{match.format}</div>
        </div>
      </div>
    </div>
  );
};

export default Match;
