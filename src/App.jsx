import React, { useEffect, useState } from "react";
import React, { useState } from 'react';

// import React from 'react';
// import ReactDOM from 'react-dom/client';


import * as s from "./App.module.scss";

const App = () => {
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [basicsalary, setBasicSalary] = useState(0);
  const [gratuity, setGratuity] = useState(0);
  const [years, setYears] = useState(0);
  const [limited, setLimited] = useState(true);
  const [status, setStatus] = useState("resign");
  const [reset, setresetForm] = useState("");
  // form reset
  // const [form] = (values) =>{
  //   setTimeout(()=>{
  //     form.resetFields();
  //   },500);
  // };

  const resetForm = () => {
    console.log("i am in function");
    setFirstDay(" ")
    setLastDay(" ")
    setBasicSalary(" ")
    setGratuity(" ")
    setYears(" ")
    setLimited(" ")
    setStatus(" ")
  };


  
  const getFirstDay = (e) => {
    console.log("FirstDate = ", e.target.value);
    setFirstDay(e.target.value);
  };

  const getLastDay = (e) => {
    console.log("Last Date = ", e.target.value);
    setLastDay(e.target.value);
  };

  const getGratuity = () => {
    d2 = new Date(lastDay);
    d1 = new Date(firstDay);
    const years = Math.abs(d2 - d1) / (1000 * 60 * 60 * 24 * 365);
    console.log("years", years);
    setYears(years);
    if (status == "resign") {
      if (years < 1) {
        alert("You're not eligble for gratuity.");
      } else if (years >= 1 && years < 3) {
        setGratuity(parseInt((basicsalary * 21 * years) / 30));
      } else if (years >= 3) {
        setGratuity(parseInt((basicsalary * 30 * years) / 30));
      }
    } else if (status == "terminate") {
      alert("Gratuity only applies to people who are not terimated.");
    } else {
      alert("Please fill the form correctly.");
    }
  };

  const handleContract = (e) => {
    const type = e.target.value;
    setLimited(type);
    console.log("Contract type:", type);
  };

  const handleStatus = (e) => {
    const value = e.target.value;
    setStatus(value);
    console.log("Status:", value);
  };

  useEffect(() => {
    if (years > 3) {
      setLimited(false);
    } else {
      setLimited(true);
    }
  }, [years]);

  return (
    <>
      <h1 className={s.pageTitle}>Gratuity Calculator</h1>
      <div className={s.container}>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "25px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <label htmlFor="first-day" className={s.dateInputLabel}>
              Starting Date:
            </label>
            <input
              type={"date"}
              id={"first-day"}
              value={firstDay}
              name={"first-day"}
              className={s.dateInput}
              onChange={getFirstDay}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <label htmlFor="last-day" className={s.dateInputLabel}>
              Ending Date:
            </label>
            <input
              type={"date"}
              id={"last-day"}
              value={lastDay}
              name={"last-day"}
              className={s.dateInput}
              onChange={getLastDay}
            ></input>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "25px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <label htmlFor="contract" className={s.dateInputLabel}>
              Select contract type:
            </label>
            <select
              name="contract"
              id="contract"
              className={s.selectInput}
              value={limited}
              onChange={handleContract}
            >
              <option value={true}>Limited</option>
              <option value={false}>Unlimited</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <label htmlFor="status" className={s.dateInputLabel}>
              Status:
            </label>
            <select
              name="status"
              id="status"
              required={true}
              className={s.selectInput}
              value={status}
              onChange={handleStatus}
            >
              <option value={"resign"}>Resignation</option>
              <option value={"terminate"}>Termination</option>
            </select>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <label htmlFor="basic salary" className={s.dateInputLabel}>
            Basic Salary:
          </label>
          <input
            type={"number"}
            id={"basic salary"}
            value={basicsalary}
            name={"basic salary"}
            className={s.dateInput}
            style={{ width: "930px" }}
            onChange={(e) => setBasicSalary(e.target.value)}
          ></input>
        </div>

        <div
          className="btn-flex"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            justifyContent: "space-between",
          }}
        >
          {/* calculate button */}
          <button
            className={s.btn}
            style={{ width: "445px" }}
            onClick={getGratuity}
          >
            Calculate
          </button>
          {/* reset button */}

          <button type="button" onClick={resetForm}
            style={{ width: "455px", borderColor:"#00acee"}}
            className={s.button}
            
          >
            Reset
          </button>

        </div>
        <h1 style={{ width: "930px", color: "blue" }}>
          {gratuity ? `Gratuity = ${gratuity}` : null}
        </h1>
      </div>
    </>
  );
};

export default App;
