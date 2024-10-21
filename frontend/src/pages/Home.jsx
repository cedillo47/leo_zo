import { useState, useEffect } from "react";
import { loadFeed } from "../adapters/feed-adapter";
import { fetchHandler } from "../utils/fetchingUtils";
import { usePagination } from "../hooks/usePagination";

export default function HomePage() {
  const { error, isLoading, data, hasMore, page, loadMore } = usePagination(loadFeed);

  console.log(data);

  return (
    <>
      <h1>Home</h1> 
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      {error && <p>Error: {error.message}</p>}
      {isLoading && <p>Loading...</p>}
      <button onClick={loadMore} disabled={isLoading || !hasMore}>
        {hasMore ? "Load More" : "No more posts"}
      </button>
    </>
  );
}
