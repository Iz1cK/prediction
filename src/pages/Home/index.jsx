import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import axios from "axios";
import Match from "../../components/Match";

let axiosConfig = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    setPredictions([]);
    const getData = async () => {
      setLoading(true);
      setData(
        (await axios.get(`http://localhost:4000/api/all-matches`)).data.result
      );
      setPredictions(
        (
          await axios.get(
            `http://localhost:4000/api/get-predictions`,
            axiosConfig
          )
        ).data.result.sort((a, b) => a.matchid - b.matchid)
      );
      setLoading(false);
    };
    getData();
  }, []);

  // useEffect(() => {}, [predictions]);

  const handleDone = async () => {
    await axios.post(
      `http://localhost:4000/api/make-predictions`,
      predictions,
      axiosConfig
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
      <button onClick={handleDone}>done</button>
    </>
  );
}

export default Home;
