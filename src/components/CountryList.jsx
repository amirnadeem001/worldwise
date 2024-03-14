import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import useCities from "../context/citiescontext";

function CountryList() {
  const { cities } = useCities();

  return (
    <ul className={styles.countryList}>
      {cities.map((country, i) => (
        <CountryItem key={i} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
