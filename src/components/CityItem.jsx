import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import useCities from "../context/citiescontext";

/* eslint-disable */

function CityItem({ city }) {
  const date = new Date(city.date);

  const { currentCity, deleteCity } = useCities();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const handleClick = (e) => {
    e.preventDefault();
    deleteCity(city.id);
  };

  return (
    <li>
      <Link
        to={`${city.id}?lat=${city?.position?.lat}&lang=${city?.position?.lng}`}
        className={`${styles.cityItem} ${
          city.id === currentCity.id && styles["cityItem--active"]
        }`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <p className={styles.name}>{city.cityName}</p>
        <p className={styles.date}>{formattedDate}</p>
        <button onClick={handleClick} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
