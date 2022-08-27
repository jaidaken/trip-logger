import React, { useEffect, useState } from 'react';

function Home() {
  const [places, setPlaces] = useState([]);
  const [err, setErr] = useState(null);

  const fetchPlaces = async () => {
    try {
      const response = await fetch('/api/v1/places');
      if (!response.ok) throw response;
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      setErr(error);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  if (!err && !places.length) return <p>No Places listed</p>;
  if (err) return <p>Error, Check Console.</p>;

  return <p>{JSON.stringify(places)}</p>;
}

export default Home;
