import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  function norm(x) {
    return ((((x + 180) % 360) + 360) % 360) - 180;
  }

  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // 映射到定义域
  const lngConverted = norm(Number(lng));
  return [lat, lngConverted];
}

export { useUrlPosition };
