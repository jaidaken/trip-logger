/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useState, useCallback, useContext,
} from 'react';
import { UIContext } from './ui.context';
import { AuthContext } from './auth.context';
import { PlacesContext } from './places.context';

const headers = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  // 'Content-Type': 'application/x-www-form-urlencoded',
};

export const TripsContext = createContext({
  fetchTrips: () => [],
  addTrip: () => {},
  updateTrip: () => {},
  deleteTrip: () => {},
  loaded: false,
  loading: false,
  error: null,
  trips: [],
});

export function TripsProvider(props) {
  const { accessToken } = useContext(AuthContext);
  const { showMessage } = useContext(UIContext);
  const { places } = useContext(PlacesContext);
  // console.log('places', places);
  const [state, setState] = useState({
    loading: false,
    loaded: false,
    error: null,
    trips: [],
  });

  const {
    loading, error, trips, loaded,
  } = state;
  // console.log('rerendering', {loading, error, trips, loaded});

  const setLoading = useCallback(
    () => setState({
      ...state,
      loading: true,
    }),
    [state],
  );

  const setTrips = useCallback(
    (data) => setState({
      ...state,
      trips: data,
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

  const fetchTrips = useCallback(async () => {
  // console.log('loading', loading);
  // console.log('error', error);
    // console.log('fetchTrips called');
    // console.log('accessToken', accessToken);

    const { loading, loaded, error } = state;

    if (loading || loaded || error) {
      return;
    }

    if (!accessToken) {
      console.warn('Call stopped because no access token');
      return;
    }

    setLoading();

    try {
      const response = await fetch('/api/v1/trips', {
        headers: { ...headers, Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setTrips(data);
    } catch (err) {
      // console.log('err', err);
      setError(err);
      showMessage({ type: 'error', message: 'Error: Failed to load trips' });
    }
  }, [accessToken, setError, setLoading, setTrips, state]);

  const addTrip = useCallback(
    async (formData) => {
      if (!accessToken) return;
      // console.log('headers', headers);
      // console.log('accessToken', accessToken);
      const fullPlace = places.find(({ _id }) => _id === formData.place);
      setLoading();
      const { trips } = state;
      try {
        const response = await fetch('/api/v1/trips', {
          method: 'POST',
          headers: { ...headers, Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedTrip = await response.json();
        // console.log('got data', savedTrip);

        savedTrip.place = fullPlace;
        setTrips([...trips, savedTrip]);
        showMessage({
          type: 'success',
          message: `Added ${savedTrip.place.name.common}`,
        });
      } catch (err) {
        // console.log(err);
        setState(err);
        showMessage({
          type: 'error',
          message: `Error: Failed to add trip to ${fullPlace.name.common}`,
        });
      }
    },
    [accessToken, /* addToast, */ setLoading, setTrips, state],
  );

  const updateTrip = useCallback(
    async (id, updates) => {
      if (!accessToken) return;
      let newTrip = null;
      setLoading();
      const { trips } = state;
      try {
        const response = await fetch(`/api/v1/trips/${id}`, {
          method: 'PUT',
          headers: { ...headers, Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify(updates),
        });
        if (!response.ok) {
          throw response;
        }
        // Get index
        const index = trips.findIndex((trip) => trip._id === id);

        // Get actual trip
        const oldTrip = trips[index];
        // console.log('🚀 ~ file: trips.context.js ~ line 95 ~ updateTrip ~ oldTrip', oldTrip);

        // Merge with updates
        newTrip = {
          // legit use of 'var', so can be seen in catch block
          ...oldTrip,
          ...updates, // order here is important for the override!!
        };
        // console.log('🚀 ~ file: trips.context.js ~ line 99 ~ updateTrip ~ newTrip', newTrip);
        // recreate the trips array
        const updatedTrips = [...trips.slice(0, index), newTrip, ...trips.slice(index + 1)];
        // console.log('🚀 ~ file: trips.context.js ~ line 120 ~ updatedTrips', updatedTrips);
        setTrips(updatedTrips);
        showMessage({
          type: 'success',
          message: `Updated ${newTrip.place.name.common}`,
        });
      } catch (err) {
        // console.log(err);
        setError(err);
        showMessage({
          type: 'error',
          message: `Error: Failed to update ${newTrip.place.name.common}`,
        });
      }
    },
    [accessToken, /* addToast, */ setError, setLoading, setTrips, state],
  );

  const deleteTrip = useCallback(
    async (id) => {
      // console.log('calling deleteTrip', accessToken);
      if (!accessToken) return;
      let deletedTrip = null;
      setLoading();
      const { trips } = state;
      try {
        const response = await fetch(`/api/v1/trips/${id}`, {
          method: 'DELETE',
          headers: { ...headers, Authorization: `Bearer ${accessToken}` },
        });
        if (response.status !== 204) {
          throw response;
        }
        // Get index
        const index = trips.findIndex((trip) => trip._id === id);
        deletedTrip = trips[index];
        // recreate the trips array without that trip
        const updatedTrips = [...trips.slice(0, index), ...trips.slice(index + 1)];
        setTrips(updatedTrips);
        showMessage({
          type: 'success',
          message: `Deleted ${deletedTrip.place.name.common}`,
        });
      } catch (err) {
        // console.log(err);
        setError(err);
        showMessage({
          type: 'error',
          message: `Error: Failed to delete ${deletedTrip.place.name.common}`,
        });
      }
    },
    [accessToken, /* addToast, */ setError, setLoading, setTrips, state],
  );

  return (
    <TripsContext.Provider
      value={{
        trips,
        loading,
        error,
        loaded,
        fetchTrips,
        addTrip,
        updateTrip,
        deleteTrip,
      }}
    >
      {/* {JSON.stringify(accessToken)} */}
      {props.children}
    </TripsContext.Provider>
  );
}
