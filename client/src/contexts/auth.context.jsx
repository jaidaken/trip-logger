/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from 'react';
// import { useToasts } from "react-toast-notifications";
import { useAuth0 } from '@auth0/auth0-react';
// import cloneDeep from 'lodash.cloneDeep' <-- use if your objects get complex
const domain = window.location.host;

export const AuthContext = createContext({
  accessToken: null,
  user: null,
  error: null,
  isAuthenticated: false,
  isLoading: false,
  logout: () => {},
});

export function AuthProvider(props) {
  const {
  // Auth state:
    error,
    isAuthenticated,
    isLoading,
    user,
    // Auth methods:
    getAccessTokenSilently,
    // getAccessTokenWithPopup,
    // getIdTokenClaims,
    loginWithRedirect,
    // loginWithPopup,
    logout,
  } = useAuth0();

  const [accessToken, setAccessToken] = useState(null);
  console.log('our auth RR token', accessToken);

  useEffect(() => {
    const getToken = async () => {
      console.log('getting AT', `http://${domain}/api/v1`);
      try {
        const Acctoken = await getAccessTokenSilently();
        console.log('GOT AT', Acctoken);
        setAccessToken(Acctoken);
      } catch (err) {
        console.log('getAccessTokenSilently err', err);
        if (err.error === 'login_required' || err.error === 'consent_required') {
          loginWithRedirect();
        }
      }
    };
    if (user && !isLoading && !error) {
      console.log('user', user);
      getToken();
    }
  }, [accessToken, getAccessTokenSilently, loginWithRedirect, user]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        error,
        isAuthenticated,
        isLoading,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
