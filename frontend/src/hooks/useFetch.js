import { useEffect, useState } from "react";

export const useFetch = (adapterFunction) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [resData, resError] = await adapterFunction;
        if (resError) setError(resError)
        else setData(resData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData()
  }, [adapterFunction]);

  return { error, data, isLoading };
};
