import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import useCities from "../context/citiescontext";
import Spinner from "./Spinner";
import spinnerStyle from "./Spinner.module.css";

/*eslint-disable*/

function CityList() {
  const { cities, setCities, isLoading } = useCities();

  if (cities.length === 0)
    return (
      <Message message={"Add your city by clicking on your city on the map"} />
    );

  return (
    <>
      {isLoading ? (
        <Spinner className={spinnerStyle.spinner} />
      ) : (
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <CityItem key={city.id} city={city} />
          ))}
        </ul>
      )}
    </>
  );
}

export default CityList;
