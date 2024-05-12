import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import { Input, AutoComplete } from "antd";
import { useDebounce } from "use-debounce";

export default function WeatherSection() {
  const weatherKey = process.env.NEXT_PUBLIC_WEATHER_KEY;

  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [options, setOptions] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isFetching, setIsFetching] = useState(false);

  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let cancelTokenSource = axios.CancelToken.source(); // Create cancel token source

    const fetchSuggestions = async () => {
      if (debouncedSearchTerm) {
        try {
          setIsFetching(true);
          const response = await axios.get(
            `https://api.weatherapi.com/v1/search.json?key=${weatherKey}&q=${debouncedSearchTerm}`,
            { cancelToken: cancelTokenSource.token } // Add cancel token to request
          );
          setOptions(
            response.data.map((row) => ({
              value: row.name + ", " + row.region,
              key: row.id,
            }))
          );
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
            console.log(error);
          }
        } finally {
          setIsFetching(false);
        }
      } else {
        setOptions([]);
      }
    };

    fetchSuggestions();
    return () => {
      cancelTokenSource.cancel(); // Cancel pending requests on unmount/update
    };
  }, [debouncedSearchTerm, weatherKey]);

  const onSearch = async () => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${debouncedSearchTerm}&aqi=no`);
      setData(response.data);
      setErrorMessage(null);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error.message);
      }
    }
  };

  const onSelect = async (value) => {
    setSearchTerm(value);
    setErrorMessage(null);

    try {
      setIsFetching(true);
      await onSearch();
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <main>
      <h1>Spotweather</h1>
      {data && !errorMessage ? <WeatherCard data={data} /> : <p className="error-message">{errorMessage}</p>}
      <AutoComplete
        options={options}
        onSelect={onSelect}
        dropdownMatchSelectWidth={true}
        notFoundContent={isFetching ? "Loading..." : "No data"} // Show loading or no data message
        style={{
          fontWeight: "bold",
          margin: 50,
          width: "70%",
        }}>
        <Input.Search placeholder="Search Location" onChange={changeHandler} onSearch={onSearch} />
      </AutoComplete>
    </main>
  );
}
