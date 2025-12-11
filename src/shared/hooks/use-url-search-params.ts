import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useUrlSearchParams() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleUpdateQueryParams = (key: string, value: string) => {
    queryParams.set(key, value);
    navigate(`?${queryParams.toString()}`);
  };

  useEffect(() => {
    navigate(`?${queryParams.toString()}`);
  }, [location.search]);

  return { queryParams, handleUpdateQueryParams };
}
