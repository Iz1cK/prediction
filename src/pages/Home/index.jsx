import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import axios from "axios";
import Match from "../../components/Match";

function Home({ accessToken }) {
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

  const formatMatchesByDate = (dataArr) => {
    let arr = [];
    let added = [];
    for (let i = 0; i < dataArr.length; i++) {
      const date = dataArr[i].date.split("T")[0].split("-").reverse().join("/");
      let temp = [];
      for (let j = 0; j < dataArr.length; j++) {
        if (
          dataArr[j].date.split("T")[0].split("-").reverse().join("/") === date
        ) {
          temp.push(dataArr[j]);
        }
      }
      if (!added.includes(date)) {
        arr.push({ [date]: temp });
        added.push(date);
      }
    }
    setTempData(arr);
  };

  useEffect(() => {
    setPredictions([]);
    const getData = async () => {
      setLoading(true);
      setData(async (prevData) => {
        prevData = (
          await axios.get(`http://localhost:4000/api/current-matches`)
        ).data.result;
        formatMatchesByDate(prevData);
      });
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <div className={style.date}>
        <h1>{data[0].date.split("T")[0].split("-").reverse().join("/")}</h1>
      </div> */
      /* {data.map((match, index) => {
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
