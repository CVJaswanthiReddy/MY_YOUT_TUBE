import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { YOUTUBE_SEARCH_API } from "../utilis/constants";
import VideoCard from "./VideoCard";

const SearchResultsPage = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(YOUTUBE_SEARCH_API + query);
        const json = await response.json();
        setResults(json.items || []); // Adjust based on actual API response
      } catch (error) {
        setError("Failed to fetch results");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Search Results for: "{query}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((item) => (
          <VideoCard key={item.id.videoId} video={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
