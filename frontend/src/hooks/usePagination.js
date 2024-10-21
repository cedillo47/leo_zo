import { useEffect, useState, useCallback } from "react";

export const usePagination = (adapterFunction, initialPage = 1, limit = 3) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async (curPage) => {
    try {
      setIsLoading(true);
      const [resData, error] = await adapterFunction(curPage, limit);
      if (error) {
        setError(error)
        return 
      }

      if (page < limit) setHasMore(false);

      setData(prevData => [...prevData, ...resData.data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [adapterFunction, limit]);

  useEffect(() => {
    fetchData(page);
  }, [fetchData]);

  const loadMore = () => {
    // const newPage = page + 1
    // setPage(newPage)
    fetchData(page + 1)
  }

  return { error, data, isLoading, loadMore, hasMore };
};
