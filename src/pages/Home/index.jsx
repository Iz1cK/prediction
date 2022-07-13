import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import axios from "axios";
import Match from "../../components/Match";

function Home({ accessToken }) {
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    setPredictions([]);
    const getData = async () => {
      setLoading(true);
      setData(
        (await axios.get(`http://localhost:4000/api/current-matches`)).data
          .result
      );
      setPredictions(
        (
          await axios.get(`http://localhost:4000/api/get-predictions`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          })
        ).data.result.sort((a, b) => a.matchid - b.matchid)
      );
      setLoading(false);
    };
    getData();
  }, [accessToken]);

  const handleDone = async () => {
    await axios.post(
      `http://localhost:4000/api/make-predictions`,
      predictions,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  const formatMatchesByDate = () => {
    let arr = [];
    let added = [];
    for (let i = 0; i < data.length; i++) {
      const date = data[i].date.split("T")[0].split("-").reverse().join("/");
      let temp = [];
      for (let j = 0; j < data.length; j++) {
        if (
          data[j].date.split("T")[0].split("-").reverse().join("/") === date
        ) {
          temp.push(data[j]);
        }
      }
      if (!added.includes(date)) {
        arr.push({ [date]: temp });
        added.push(date);
      }
    }
    setTempData(arr);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <div className={style.date}>
        <h1>{data[0].date.split("T")[0].split("-").reverse().join("/")}</h1>
      </div> */}
      <button onClick={formatMatchesByDate}>format</button>
      {/* {data.map((match, index) => {
        return (
          <Match
            match={match}
            matchid={match.matchid}
            predictions={predictions}
            setPredictions={setPredictions}
            key={index}
            handleDone={handleDone}
          ></Match>
        );
      })} */}
      {tempData.map((match, index) => {
        let matchDate = Object.keys(match)[0];
        return (
          <>
            <div className={style.date}>
              <h1 key={index}>{matchDate}</h1>
            </div>
            {match[matchDate].map((m, i) => {
              return (
                <Match
                  match={m}
                  matchid={i}
                  predictions={predictions}
                  setPredictions={setPredictions}
                  key={i}
                  handleDone={handleDone}
                ></Match>
              );
            })}
          </>
        );
      })}
    </>
  );
}

export default Home;
