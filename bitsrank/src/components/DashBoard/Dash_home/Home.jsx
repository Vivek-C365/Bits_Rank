import { memo } from 'react';
import useFetchData from "../../../Api/DataFetch";

const Home = () => {
  const { data, loading, error } = useFetchData('url/get_urls');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fetched Data:</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : 'No data available'}</pre>
    </div>
  );
};

// Memoizing the component to avoid unnecessary re-renders
export default memo(Home);
