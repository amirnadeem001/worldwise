/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import BackButton from "./BackButton";
import useURLPosition from "../hooks/useURLPosition";
import Message from "./Message";
import Button from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCities from "../context/citiescontext";
import Spinner from "./Spinner";
import spinnerStyle from "./Spinner.module.css";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("idle");
  const { isLoading, createCity, dispatch } = useCities();
  const navigate = useNavigate();

  const [lat, lng] = useURLPosition();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      date,
      notes,
      position: { lat, lng },
    };
    createCity(newCity);
    navigate("/app/cities");
  };

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setGeoCodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.city) throw Error("No city found, Click on another location");
        setCityName(data.city || data.locality || "");
        setCountry(data.countyName);
      } catch (error) {
        setGeoCodingError(error.message);
      }
    };
    fetchCityData();
  }, [lat, lng]);

  if (geoCodingError) return <Message message={geoCodingError} />;
  if (!lat && !lng) return <Message message="Start by clicking  on the map" />;

  return (
    <>
      {isLoading ? (
        <Spinner className={spinnerStyle.spinner} />
      ) : (
        <form className={styles.form}>
          <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
              id="cityName"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
            />
            {/* <span className={styles.flag}>{emoji}</span> */}
          </div>

          <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            <DatePicker
              id="date"
              className="datePicker"
              onChange={(date) => setDate(date)}
              selected={date}
              dateFormat={"dd/MM/yyyy"}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </div>

          <div className={styles.buttons}>
            <Button onClick={handleSubmit} type="primary">
              Add
            </Button>
            <BackButton />
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
