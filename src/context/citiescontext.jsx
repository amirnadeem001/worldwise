import { createContext, useContext, useEffect, useReducer } from "react";
/*eslint-disable*/

const citiesContext = createContext();
const BASE_URL = "http://localhost:9000";

const initialState = {
  currentCity: {},
  cities: [],
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "current_city":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        cities: [...state.cities.filter((city) => city.id !== action.payload)],
        isLoading: false,
        currentCity: {},
      };
    default:
      throw new Error("Invalid Action");
  }
};

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/loaded", payload: data });

        if (!response.ok) throw new Error();
      } catch (err) {}
    }
    fetchData();
  }, []);

  const getCity = async (id) => {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({ type: "current_city", payload: data });

      if (!response.ok) throw new Error();
    } catch (err) {}
  };
  const createCity = async (newCity) => {
    dispatch({ type: "loading" });

    try {
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      dispatch({ type: "city/created", payload: data });

      if (!response.ok) throw new Error();
    } catch (err) {}
  };
  const deleteCity = async (id) => {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });

      if (!response.ok) throw new Error();
    } catch (err) {}
  };

  return (
    <citiesContext.Provider
      value={{
        cities,
        getCity,
        currentCity,
        isLoading,
        createCity,
        deleteCity,
        dispatch,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
};

export default function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined) throw new Error();
  return context;
}

export { CitiesProvider, useCities };
