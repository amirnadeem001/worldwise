import { useSearchParams } from "react-router-dom";

const useURLPosition = () => {
  const [searchPrams] = useSearchParams();
  const lat = searchPrams.get("lat");
  const lng = searchPrams.get("lang");

  return [lat, lng];
};

export default useURLPosition;
