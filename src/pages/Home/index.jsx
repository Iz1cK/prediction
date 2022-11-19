import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import axios from "axios";
import Match from "../../components/Match";

function Home({ accessToken }) {
  const [data, setData] = useState([]);
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
    return arr;
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const fetchedData = (
        await axios.get(`http://localhost:4000/api/current-matches`)
      ).data.result;
      setData(formatMatchesByDate(fetchedData));
      const fetchedPredictions = (
        await axios.get(`http://localhost:4000/api/get-predictions`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
      ).data.result.sort((a, b) => a.matchid - b.matchid);
      setPredictions(fetchedPredictions);
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
      {data.map((match, index) => {
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
                  matchid={m.matchid}
                  predictions={predictions}
                  setPredictions={setPredictions}
                  key={m.matchid}
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

{
  /* <div className={style.date}>
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
      })} */
}
