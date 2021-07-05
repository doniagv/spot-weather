import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { WeatherCard } from "../components/WeatherCard";
import { Input, AutoComplete } from "antd";

import "antd/dist/antd.css";

export default function Home() {
  const [data, setData] = useState();
  const [location, setLocation] = useState("Puebla");
  const [errorMessage, setErrorMessage] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [options, setOptions] = useState([]);

  const changeHandler = async (e) => {
    setLocation(e.target.value);
    console.log(process.env.API_KEY);
    await axios
      .get(
        `http://api.weatherapi.com/v1/search.json?key=${process.env.API_KEY}&q=${e.target.value}`
      )
      .then(
        (response) => {
          setSuggestions(response.data);
          const options = suggestions.map((row) => {
            return { value: row.name };
          });
          setOptions(options);
        },
        (error) => {
          console.log(error);
        }
      );
    console.log(options);
  };

  const onSearch = async () => {
    await axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${location}&aqi=no`
      )
      .then(
        (response) => {
          setData(response.data);
          setErrorMessage(null);
        },
        (error) => {
          if (error.response) {
            setErrorMessage(error.response.data.error.message);
          }
        }
      );
  };

  const onSelect = (value) => {
    setLocation(value);
    console.log("onSelect");
  };

  return (
    <div className="container">
      <Head>
        <title>Spotweather</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        <h1>Spotweather</h1>

        {data && !errorMessage ? (
          <WeatherCard data={data} />
        ) : (
          <p className="error-message">{errorMessage}</p>
        )}
        <AutoComplete
          options={options}
          onSelect={onSelect}
          dropdownMatchSelectWidth={300}
          style={{
            fontWeight: "bold",
            margin: 50,
          }}
        >
          <Input.Search
            placeholder="Search Location"
            onChange={changeHandler}
            onSearch={onSearch}
          />
        </AutoComplete>
      </main>
      {/* <div
        style={{ position: "relative", width: "100%", paddingBottom: "20%" }}
      >
        <Image
          alt="Image Alt"
          src={"/rain.jpg"}
          layout="fill"
          objectFit="contain" // Scale your image down to fit into the container
        />
      </div> */}

      <footer>
        <p>
          Spotweather | Andoni Technology | Powered by{" "}
          <a href="https://www.weatherapi.com/" title="Free Weather API">
            WeatherAPI.com
          </a>{" "}
        </p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .ant-select-item-option {
          color: black !important;
        }

        h1 {
          color: white;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .error-message {
          color: white;
          font-size: 1.6rem;
        }

        footer {
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Quicksand", sans-serif;
          background-color: #393e46;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
