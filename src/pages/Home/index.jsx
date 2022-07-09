import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import axios from "axios";
import Match from "../../components/Match";

function Home({ accessToken }) {
  const [data, setData] = useState([]);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={style.date}>
        <h1>{data[0].date.split("T")[0].split("-").reverse().join("/")}</h1>
      </div>
      {data.map((match, index) => {
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
      })}
    </>
  );
}

export default Home;
