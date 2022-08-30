/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useState, useCallback, useContext,
} from 'react';
import { AuthContext } from './auth.context';

const headers = {
  'Content-Type': 'application/json',
  // 'Content-Type': 'application/x-www-form-urlencoded',
};

export const UsersContext = createContext({
  fetchUsers: () => [],
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  loaded: false,
  loading: false,
  error: null,
  users: [],
});

export function UsersProvider(props) {
  const { accessToken } = useContext(AuthContext);

  const [state, setState] = useState({
    loading: false,
    loaded: false,
    error: null,
    users: [],
  });

  const {
    loading, error, users, loaded,
  } = state;
  // console.log('rerendering', {loading, error, users, loaded});

  const setLoading = useCallback(
    () => setState({
      ...state,
      loading: true,
    }),
    [state],
  );

  const setUsers = useCallback(
    (data) => setState({
      ...state,
      users: data,
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

  const fetchUsers = useCallback(async () => {
    // console.log('loading', loading);
    // console.log('error', error);

    const { loading, loaded, error } = state;

    if (loading || loaded || error) {
      return;
    }

    setLoading();

    try {
      const response = await fetch('/api/v1/users', {
        headers: accessToken ? { ...headers, Authorization: `Bearer ${accessToken}` } : headers,
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setUsers(data);
      // console.log('users from context', users);
    } catch (err) {
      // console.log('err', err);
      setError(err);
    }
  }, [accessToken, setError, setLoading, setUsers, state]);

  const addUser = useCallback(
    async (formData) => {
      if (!accessToken) return;
      // console.log('headers', headers);
      // console.log('accessToken', accessToken);
      setLoading();
      const { users } = state;
      try {
        const response = await fetch('/api/v1/users', {
          method: 'POST',
          headers: accessToken ? { ...headers, Authorization: `Bearer ${accessToken}` } : headers,
          body: JSON.stringify(formData),
        });
        if (response.status !== 201) {
          throw response;
        }
        const savedUser = await response.json();
        // console.log('got data', savedUser);
        setUsers([...users, savedUser]);
        // addToast(`Saved ${savedUser.title}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        // console.log(err);
        setState(err);
        // addToast(`Error ${err.message || err.statusText}`, {
        //   appearance: "error",
        // });
      }
    },
    [accessToken, /* addToast, */ setLoading, setUsers, state],
  );

  const updateUser = useCallback(
    async (id, updates) => {
      if (!accessToken) return;
      let newUser = null;
      setLoading();
      const { users } = state;
      try {
        const response = await fetch(`/api/v1/users/${id}`, {
          method: 'PUT',
          headers: accessToken ? { ...headers, Authorization: `Bearer ${accessToken}` } : headers,
          body: JSON.stringify(updates),
        });
        if (!response.ok) {
          throw response;
        }
        // Get index
        const index = users.findIndex((user) => user._id === id);

        // Get actual user
        const oldUser = users[index];
        // console.log('🚀 ~ file: users.context.js ~ line 95 ~ updateUser ~ oldUser', oldUser);

        // Merge with updates
        newUser = {
          // legit use of 'var', so can be seen in catch block
          ...oldUser,
          ...updates, // order here is important for the override!!
        };
        // console.log('🚀 ~ file: users.context.js ~ line 99 ~ updateUser ~ newUser', newUser);
        // recreate the users array
        const updatedUsers = [...users.slice(0, index), newUser, ...users.slice(index + 1)];
        // console.log('🚀 ~ file: users.context.js ~ line 120 ~ updatedUsers', updatedUsers);
        setUsers(updatedUsers);
        // addToast(`Updated ${newUser.title}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        // console.log(err);
        setError(err);
        // addToast(`Error: Failed to update ${newUser.title}`, {
        //   appearance: "error",
        // });
      }
    },
    [accessToken, /* addToast, */ setError, setLoading, setUsers, state],
  );

  const deleteUser = useCallback(
    async (id) => {
      if (!accessToken) return;
      let deletedUser = null;
      setLoading();
      const { users } = state;
      try {
        const response = await fetch(`/api/v1/users/${id}`, {
          method: 'DELETE',
          headers: accessToken ? { ...headers, Authorization: `Bearer ${accessToken}` } : headers,
        });
        if (response.status !== 204) {
          throw response;
        }
        // Get index
        const index = users.findIndex((user) => user._id === id);
        deletedUser = users[index];
        // recreate the users array without that user
        const updatedUsers = [...users.slice(0, index), ...users.slice(index + 1)];
        setUsers(updatedUsers);
        // addToast(`Deleted ${deletedUser.title}`, {
        //   appearance: "success",
        // });
      } catch (err) {
        // console.log(err);
        setError(err);
        // addToast(`Error: Failed to update ${deletedUser.title}`, {
        //   appearance: "error",
        // });
      }
    },
    [accessToken, /* addToast, */ setError, setLoading, setUsers, state],
  );

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        error,
        loaded,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
}
