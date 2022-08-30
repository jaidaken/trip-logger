/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useState, useCallback, useContext,
} from 'react';

export const UIContext = createContext({
  snackbar: {
    open: false,
    type: 'default',
    message: '',
  },
  navDrawer: {
    open: false,
  },
  openNav: () => {},
  closeNav: () => {},
  toggleNav: () => {},
  showMessage: () => {},
  resetMessage: () => {},
});

export function UIProvider(props) {
  const defaultSnackbarState = {
    open: false,
    type: 'info',
    message: '',
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    autoHideDuration: 6000,
  };
  const [snackbar, setSnackbar] = useState(defaultSnackbarState);

  const [navDrawer, setNavDrawer] = useState({
    open: false,
  });

  const openNav = useCallback(() => {
    setNavDrawer({
      ...navDrawer,
      open: true,
    });
  }, [setNavDrawer, navDrawer]);

  const closeNav = useCallback(() => {
    setNavDrawer({
      ...navDrawer,
      open: true,
    });
  }, [setNavDrawer, navDrawer]);

  const toggleNav = useCallback(() => {
    setNavDrawer({
      ...navDrawer,
      open: !navDrawer.open,
    });
  }, [setNavDrawer, navDrawer]);

  const showMessage = useCallback(
    ({ message, type }) => {
      setSnackbar({
        open: true,
        type,
        message,
      });
    },
    [setSnackbar],
  );

  const resetMessage = useCallback(
    ($e, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbar(defaultSnackbarState);
    },
    [setSnackbar, defaultSnackbarState],
  );

  return (
    <UIContext.Provider
      value={{
        snackbar,
        navDrawer,
        openNav,
        closeNav,
        toggleNav,
        showMessage,
        resetMessage,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
}
