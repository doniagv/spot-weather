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
    const newLocation = e.target.value;
    setLocation(newLocation);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${weatherKey}&q=${location}`
      );
      const newSuggestions = response.data;
      setSuggestions(newSuggestions);
      const options = suggestions.map((row) => {
        return { value: row.name };
      });
      setOptions(options);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${location}&aqi=no`
      );
      setData(response.data);
      setErrorMessage(null);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error.message);
      }
    }

    // await axios
    //   .get(
    //     `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${location}&aqi=no`
    //   )
    //   .then(
    //     (response) => {
    //       setData(response.data);
    //       setErrorMessage(null);
    //     },
    //     (error) => {
    //       if (error.response) {
    //         setErrorMessage(error.response.data.error.message);
    //       }
    //     }
    //   );
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
        dropdownMatchSelectWidth={true}
        style={{
          fontWeight: "bold",
          margin: 50,
          width: "70%",
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
