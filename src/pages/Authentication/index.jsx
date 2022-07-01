import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { Steps } from "antd";
const { Step } = Steps;

function Authentication() {
  return (
    <>
      <div className={`${style.frame} ${style.step}`}>
        <Steps size="small" current={1}>
          <Step title="Finished" />
          <Step title="In Progress" style={{ color: "#FFF" }} />
          <Step title="Waiting" style={{ color: "#FFF" }} />
        </Steps>
      </div>
    </>
  );
}

export default Authentication;
