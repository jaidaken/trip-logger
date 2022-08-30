/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useState, useCallback, useContext, useEffect,
} from 'react';
import { AuthContext } from './auth.context';

const headers = {
  'Content-Type': 'application/json',
  // 'Content-Type': 'application/x-www-form-urlencoded',
};

export const PlacesContext = createContext({
  fetchPlaces: () => [],
  addPlace: () => {},
  updatePlace: () => {},
  deletePlace: () => {},
  loaded: false,
  loading: false,
  error: null,
  places: [],
});

export function PlacesProvider(props) {
  const { accessToken } = useContext(AuthContext);

  const [state, setState] = useState({
    loading: false,
    loaded: false,
    error: null,
    places: [],
  });

  const {
    loading, error, places, loaded,
  } = state;
  // console.log('rerendering', {loading, error, places, loaded});

  const setLoading = useCallback(
    () => setState({
      ...state,
      loading: true,
    }),
    [state],
  );

  const setPlaces = useCallback(
    (data) => setState({
      ...state,
      places: data,
      loading: false,
      loaded: true,
    }),
    [state],
  );

  const setError = useCallback(
    (err) => setState({
      ...state,
      error: err.message || err.statusText,
      loading: false,
      loaded: true,
    }),
    [state],
  );

  // const [search, setSearch] = useState("");

  const fetchPlaces = useCallback(async () => {
  // console.log('loading', loading);
  // console.log('error', error);

    const { loading, loaded, error } = state;

    if (loading || loaded || error) {
      return;
    }

    setLoading();

    try {
      const response = await fetch('/api/v1/places', {
        headers: accessToken ? { ...headers, Authorization: `Bearer ${accessToken}` } : headers,
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setPlaces(data);
      // console.log('places from context', places);
    } catch (err) {
      console.log('err', err);
      setError(err);
    }
  }, [accessToken, setError, setLoading, setPlaces, state]);

  const addPlace = useCallback(
    async (formData) => {
      if (!accessToken) return;
      console.log('headers', headers);
      console.log('accessToken', accessToken);
      setLoading();
      const { places } = state;
      try {
        const response = await fetch('/api/v1/places', {
          method: 'POST',
          headers: accessToken ? { ...headers, Authorization: `Bearer ${accessToken}` } : headers,
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedPlace = await response.json();
        console.log('got data', savedPlace);
        setPlaces([...places, savedPlace]);
        // addToast(`Saved ${savedPlace.title}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        console.log(err);
        setState(err);
        // addToast(`Error ${err.message || err.statusText}`, {
        //   appearance: "error",
        // });
      }
    },
    [accessToken, /* addToast, */ setLoading, setPlaces, state],
  );

  const updatePlace = useCallback(
    async (id, updates) => {
      if (!accessToken) return;
      let newPlace = null;
      setLoading();
      const { places } = state;
      try {
        const response = await fetch(`/api/v1/places/${id}`, {
          method: 'PUT',
          headers: accessToken ? { ...headers, Authorization: `Bearer ${accessToken}` } : headers,
          body: JSON.stringify(updates),
        });
        if (!response.ok) {
          throw response;
        }
        // Get index
        const index = places.findIndex((place) => place._id === id);

        // Get actual place
        const oldPlace = places[index];
        console.log('🚀 ~ file: places.context.js ~ line 95 ~ updatePlace ~ oldPlace', oldPlace);

        // Merge with updates
        newPlace = {
          // legit use of 'var', so can be seen in catch block
          ...oldPlace,
          ...updates, // order here is important for the override!!
        };
        console.log('🚀 ~ file: places.context.js ~ line 99 ~ updatePlace ~ newPlace', newPlace);
        // recreate the places array
        const updatedPlaces = [...places.slice(0, index), newPlace, ...places.slice(index + 1)];
        console.log('🚀 ~ file: places.context.js ~ line 120 ~ updatedPlaces', updatedPlaces);
        setPlaces(updatedPlaces);
        // addToast(`Updated ${newPlace.title}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        console.log(err);
        setError(err);
        // addToast(`Error: Failed to update ${newPlace.title}`, {
        //   appearance: "error",
        // });
      }
    },
    [accessToken, /* addToast, */ setError, setLoading, setPlaces, state],
  );

  const deletePlace = useCallback(
    async (id) => {
      if (!accessToken) return;
      let deletedPlace = null;
      setLoading();
      const { places } = state;
      try {
        const response = await fetch(`/api/v1/places/${id}`, {
          method: 'DELETE',
          headers: accessToken ? { ...headers, Authorization: `Bearer ${accessToken}` } : headers,
        });
        if (response.status !== 204) {
          throw response;
        }
        // Get index
        const index = places.findIndex((place) => place._id === id);
        deletedPlace = places[index];
        // recreate the places array without that place
        const updatedPlaces = [...places.slice(0, index), ...places.slice(index + 1)];
        setPlaces(updatedPlaces);
        // addToast(`Deleted ${deletedPlace.title}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        console.log(err);
        setError(err);
        // addToast(`Error: Failed to update ${deletedPlace.title}`, {
        //   appearance: "error",
        // });
      }
    },
    [accessToken, /* addToast, */ setError, setLoading, setPlaces, state],
  );

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <PlacesContext.Provider
      value={{
        places,
        loading,
        error,
        loaded,
        fetchPlaces,
        addPlace,
        updatePlace,
        deletePlace,
      }}
    >
      {props.children}
    </PlacesContext.Provider>
  );
}
