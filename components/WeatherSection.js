import React, { useState } from "react";
import axios from "axios";
import { WeatherCard } from "./WeatherCard";
import { Input, AutoComplete } from "antd";

const WeatherSection = () => {
  const [data, setData] = useState();
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const [options, setOptions] = useState([]);

  const weatherKey = process.env.WEATHER_KEY;

  const changeHandler = async (e) => {
    console.log(e.target.value);
    setLocation(e.target.value);
    await axios
      .get(
        `https://api.weatherapi.com/v1/search.json?key=${weatherKey}&q=${e.target.value}`
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
    console.log(location);
    await axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${location}&aqi=no`
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
  );
};

export default WeatherSection;
